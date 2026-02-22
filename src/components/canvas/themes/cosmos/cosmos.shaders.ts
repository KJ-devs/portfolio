/**
 * Cosmos theme GLSL shaders.
 * Fresnel corona neurons + volumetric nebula background.
 */

// ── Neuron shaders ──────────────────────────────────────────────────────

export const cosmosNeuronVertex = /* glsl */ `
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const cosmosNeuronFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uEmissiveIntensity;
uniform float uHover;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // Primary Fresnel rim glow (sharp corona edge)
  float rim = fresnel(viewDir, normal, 3.0);

  // Pulsing corona intensity
  float coronaPulse = sin(uTime * 2.0) * 0.15 + 0.85;
  float corona = rim * coronaPulse * uEmissiveIntensity;

  // Hover effects: intensify corona + add secondary wider Fresnel band
  float hoverCorona = 0.0;
  if (uHover > 0.0) {
    corona *= 2.0 * uHover + (1.0 - uHover);
    float wideRim = fresnel(viewDir, normal, 1.5);
    hoverCorona = wideRim * uHover * uEmissiveIntensity * 0.6;
  }

  // Base diffuse-like shading (soft hemisphere)
  float diffuse = dot(normal, vec3(0.0, 1.0, 0.5)) * 0.3 + 0.7;

  // Combine: base color with diffuse + corona halo + hover band
  vec3 baseColor = uColor * diffuse;
  vec3 coronaColor = uColor * (corona + hoverCorona);
  vec3 finalColor = baseColor * 0.4 + coronaColor;

  // Alpha: solid core with glowing rim
  float alpha = (0.6 + rim * 0.4) * uOpacity;

  gl_FragColor = vec4(finalColor, alpha);
}
`

// ── Nebula background shaders ───────────────────────────────────────────

export const cosmosNebulaVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const cosmosNebulaFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  // Slow UV rotation over time
  float angle = uTime * 0.02;
  float cosA = cos(angle);
  float sinA = sin(angle);
  vec2 centeredUv = vUv - 0.5;
  vec2 rotatedUv = vec2(
    centeredUv.x * cosA - centeredUv.y * sinA,
    centeredUv.x * sinA + centeredUv.y * cosA
  ) + 0.5;

  // Layer 1: large-scale nebula clouds
  vec3 p1 = vec3(rotatedUv * 2.0, uTime * 0.03);
  float n1 = fbm(p1, 4);

  // Layer 2: medium detail, offset and faster
  vec3 p2 = vec3(rotatedUv * 3.5 + 10.0, uTime * 0.05);
  float n2 = fbm(p2, 4);

  // Layer 3: fine detail wisps
  vec3 p3 = vec3(rotatedUv * 5.0 + 20.0, uTime * 0.07);
  float n3 = fbm(p3, 4);

  // Remap noise from [-1,1] to [0,1]
  n1 = n1 * 0.5 + 0.5;
  n2 = n2 * 0.5 + 0.5;
  n3 = n3 * 0.5 + 0.5;

  // Mix theme colors across the three noise layers
  vec3 color = uColor1 * n1 * 0.5
             + uColor2 * n2 * 0.35
             + uColor3 * n3 * 0.25;

  // Overall intensity driven by noise
  float intensity = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);

  // Soft vignette: fade at edges
  float dist = length(centeredUv) * 2.0;
  float vignette = 1.0 - smoothstep(0.4, 1.0, dist);

  float alpha = intensity * vignette * uOpacity;

  gl_FragColor = vec4(color, alpha);
}
`
