/**
 * Ocean theme GLSL shaders.
 * Jellyfish-pulse neurons + caustic background patterns.
 */

// -- Neuron shaders ----------------------------------------------------------

export const oceanNeuronVertex = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

void main() {
  vec3 pos = position;

  // Jellyfish pulse: sinusoidal displacement along normals
  float displacement = sin(pos.y * 3.0 + uTime * 2.0) * uAmplitude;

  // Stronger at equator, reduced at poles
  displacement *= (1.0 - abs(normal.y) * 0.7);

  pos += normal * displacement;

  vDisplacement = displacement;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * mvPosition;
}
`

export const oceanNeuronFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uEmissiveIntensity;
uniform float uHover;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // Inverse Fresnel: brighter inside than at edges (jellyfish translucency)
  float rim = fresnel(viewDir, normal, 2.0);
  float innerGlow = 1.0 - rim;

  // Sub-surface scattering approximation: shift toward white in the interior
  vec3 sssColor = mix(uColor, vec3(1.0), innerGlow * 0.35);

  // Gentle pulsing glow synced with vertex displacement
  float pulseGlow = 0.5 + 0.5 * sin(uTime * 2.0);
  float displacementGlow = abs(vDisplacement) * 4.0 * pulseGlow;

  // Base interior brightness
  float diffuse = dot(normal, vec3(0.0, 1.0, 0.3)) * 0.25 + 0.75;

  // Combine: translucent interior glow + sub-surface + displacement pulse
  vec3 baseColor = sssColor * diffuse * innerGlow;
  vec3 glowColor = uColor * displacementGlow * 0.6;
  vec3 emissive = uColor * uEmissiveIntensity * (innerGlow * 0.8 + rim * 0.2);

  // Hover: intensify everything
  float hoverBoost = 1.0 + uHover * 0.8;

  vec3 finalColor = (baseColor + glowColor + emissive) * hoverBoost;

  // Alpha: translucent body, slightly more opaque at interior
  float alpha = (0.5 + innerGlow * 0.2) * uOpacity;

  gl_FragColor = vec4(finalColor, alpha);
}
`

// -- Caustic background shaders ----------------------------------------------

export const oceanCausticVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const oceanCausticFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  // Layer 1: primary caustic wave
  float c1 = sin(vUv.x * 8.0 + uTime) * sin(vUv.y * 8.0 + uTime * 1.3) * 0.5 + 0.5;

  // Layer 2: secondary caustic at different scale and speed
  float c2 = sin(vUv.x * 12.0 - uTime * 0.7) * sin(vUv.y * 10.0 + uTime * 0.9) * 0.5 + 0.5;

  // Layer 3: fine detail caustic
  float c3 = sin(vUv.x * 18.0 + uTime * 1.5) * sin(vUv.y * 16.0 - uTime * 1.1) * 0.5 + 0.5;

  // Combine layers with decreasing contribution
  float caustic = c1 * 0.5 + c2 * 0.3 + c3 * 0.2;

  // Sharpen the caustic pattern
  caustic = smoothstep(0.3, 0.8, caustic);

  // Soft vignette from center of plane
  vec2 centered = vUv - 0.5;
  float vignette = 1.0 - smoothstep(0.2, 0.6, length(centered));

  vec3 finalColor = uColor * caustic;
  float alpha = caustic * vignette * uOpacity;

  gl_FragColor = vec4(finalColor, alpha);
}
`
