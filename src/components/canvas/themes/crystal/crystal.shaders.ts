/**
 * Crystal theme GLSL shaders.
 * Prismatic refraction neurons + light beam synapses + aurora background + frost sparkles.
 */

// ---------------------------------------------------------------------------
// CrystalNeuron -- vertex
// ---------------------------------------------------------------------------
export const crystalNeuronVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  gl_Position = projectionMatrix * mvPosition;
}
`

// ---------------------------------------------------------------------------
// CrystalNeuron -- fragment
// Requires FRESNEL to be prepended at runtime.
// ---------------------------------------------------------------------------
export const crystalNeuronFragment = /* glsl */ `
uniform float uTime;
uniform vec3  uColor;
uniform float uEmissiveIntensity;
uniform float uHover;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal  = normalize(vNormal);

  // --- Prismatic rainbow edge via Fresnel spectral split ---
  float f = fresnel(viewDir, normal, 2.5);
  vec3 rainbow = vec3(
    sin(f * 6.28) * 0.5 + 0.5,
    sin(f * 6.28 + 2.09) * 0.5 + 0.5,
    sin(f * 6.28 + 4.19) * 0.5 + 0.5
  );

  // --- Sparkle highlights ---
  // Bright flashes based on dot product of reflected view and up vector + time
  vec3 reflectedDir = reflect(-viewDir, normal);
  float sparkleBase = pow(max(dot(reflectedDir, vec3(0.0, 1.0, 0.0)), 0.0), 50.0);
  // Animated sparkle: flicker based on world position + time
  float sparkleAnim = sin(vWorldPosition.x * 10.0 + uTime * 3.0)
                    * sin(vWorldPosition.y * 12.0 + uTime * 2.5)
                    * sin(vWorldPosition.z * 11.0 + uTime * 3.5);
  sparkleAnim = max(sparkleAnim, 0.0);
  float sparkle = sparkleBase * sparkleAnim * 3.0;

  // --- Hover: prismatic flash + sparkle burst ---
  float hoverBoost = 1.0 + uHover * 1.5;
  float sparkleHover = sparkle * (1.0 + uHover * 4.0);
  float rainbowMix = f * (0.4 + uHover * 0.4);

  // --- Diffuse-like shading (soft hemisphere light) ---
  float diffuse = dot(normal, normalize(vec3(0.3, 1.0, 0.5))) * 0.3 + 0.7;

  // --- Combine ---
  vec3 baseColor = uColor * diffuse;
  vec3 prismatic = mix(baseColor, rainbow, rainbowMix) * uEmissiveIntensity * hoverBoost;
  vec3 sparkleColor = vec3(1.0, 0.95, 0.9) * sparkleHover * uEmissiveIntensity;

  vec3 finalColor = prismatic + sparkleColor;

  // Alpha: solid core with glowing Fresnel rim
  float alpha = (0.65 + f * 0.35) * uOpacity;

  gl_FragColor = vec4(finalColor, alpha);
}
`

// ---------------------------------------------------------------------------
// CrystalAurora -- vertex
// ---------------------------------------------------------------------------
export const crystalAuroraVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// ---------------------------------------------------------------------------
// CrystalAurora -- fragment
// Requires NOISE_3D + FBM to be prepended at runtime.
// ---------------------------------------------------------------------------
export const crystalAuroraFragment = /* glsl */ `
uniform float uTime;
uniform float uOpacity;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 uv = vUv;

  // --- Wave motion: undulating UV distortion ---
  float wave = sin(uv.x * 3.0 + uTime * 0.5) * 0.08;
  float wave2 = sin(uv.x * 5.0 - uTime * 0.3) * 0.04;
  vec2 distortedUv = uv + vec2(0.0, wave + wave2);

  // --- Aurora curtain via FBM noise ---
  vec3 noiseCoord = vec3(distortedUv * 2.5, uTime * 0.12);
  float n1 = fbm(noiseCoord, 4);
  float n2 = fbm(noiseCoord + vec3(5.2, 1.3, uTime * 0.08), 3);

  // Remap noise to [0,1]
  n1 = n1 * 0.5 + 0.5;
  n2 = n2 * 0.5 + 0.5;

  // --- Gradient from green to blue to violet across UV.x ---
  vec3 colGreen  = vec3(0.2, 0.9, 0.5);
  vec3 colBlue   = vec3(0.2, 0.5, 1.0);
  vec3 colViolet = vec3(0.6, 0.2, 0.9);

  vec3 gradientColor;
  if (uv.x < 0.5) {
    gradientColor = mix(colGreen, colBlue, uv.x * 2.0);
  } else {
    gradientColor = mix(colBlue, colViolet, (uv.x - 0.5) * 2.0);
  }

  // --- Combine noise with gradient ---
  float intensity = n1 * 0.6 + n2 * 0.4;
  vec3 auroraColor = gradientColor * intensity * 1.2;

  // --- Soft fadeout at edges ---
  float fadeX = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
  float fadeY = smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.7, uv.y);
  float edgeFade = fadeX * fadeY;

  float alpha = intensity * edgeFade * uOpacity;

  gl_FragColor = vec4(auroraColor, alpha);
}
`

// ---------------------------------------------------------------------------
// CrystalSparkle -- vertex (frost particles, 4-pointed star shape)
// ---------------------------------------------------------------------------
export const crystalSparkleVertex = /* glsl */ `
uniform float uTime;
uniform float uPointSize;

attribute float aPhase;

varying float vTwinkle;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // Perspective-scaled point size
  gl_PointSize = uPointSize * (300.0 / -mvPosition.z);

  gl_Position = projectionMatrix * mvPosition;

  // Per-particle twinkling based on unique phase offset
  vTwinkle = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * 1.5 + aPhase * 6.28));
}
`

// ---------------------------------------------------------------------------
// CrystalSparkle -- fragment (4-pointed star shape)
// ---------------------------------------------------------------------------
export const crystalSparkleFragment = /* glsl */ `
uniform vec3 uTint;

varying float vTwinkle;

void main() {
  // 4-pointed star shape using gl_PointCoord
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float star = max(abs(p.x), abs(p.y));
  float cross = min(abs(p.x), abs(p.y));
  float shape = smoothstep(0.5, 0.0, cross) * smoothstep(1.0, 0.3, star);

  if (shape < 0.01) discard;

  // White with slight color tint, high brightness
  vec3 color = mix(vec3(1.0), uTint, 0.15) * (1.2 + vTwinkle * 0.8);

  float alpha = shape * vTwinkle;

  gl_FragColor = vec4(color, alpha);
}
`

// ---------------------------------------------------------------------------
// CrystalSynapse -- vertex (light beam cylinder)
// ---------------------------------------------------------------------------
export const crystalSynapseVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vAxisPosition;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);

  // Y coordinate along the cylinder axis (0 at bottom, 1 at top for unit cylinder)
  // CylinderGeometry default: height centered at origin, so y ranges from -0.5 to 0.5
  vAxisPosition = position.y + 0.5;

  gl_Position = projectionMatrix * mvPosition;
}
`

// ---------------------------------------------------------------------------
// CrystalSynapse -- fragment (prismatic light beam)
// Requires FRESNEL to be prepended at runtime.
// ---------------------------------------------------------------------------
export const crystalSynapseFragment = /* glsl */ `
uniform float uTime;
uniform vec3  uColor;
uniform float uOpacity;
uniform float uSelected;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vAxisPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal  = normalize(vNormal);

  // --- Core: bright white/color ---
  vec3 coreColor = mix(vec3(1.0), uColor, 0.3);

  // --- Edge: prismatic rainbow dispersion (Fresnel-based) ---
  float rim = fresnel(viewDir, normal, 2.0);
  vec3 rainbow = vec3(
    sin(rim * 6.28 + uTime * 0.5) * 0.5 + 0.5,
    sin(rim * 6.28 + uTime * 0.5 + 2.09) * 0.5 + 0.5,
    sin(rim * 6.28 + uTime * 0.5 + 4.19) * 0.5 + 0.5
  );

  // --- Animated pulse traveling along the beam ---
  float pulse = sin(vAxisPosition * 12.0 - uTime * 3.0) * 0.5 + 0.5;
  pulse = pow(pulse, 3.0);

  // --- Combine ---
  float selectBoost = 1.0 + uSelected * 0.8;
  float rainbowAmount = rim * (0.3 + uSelected * 0.4);

  vec3 beamColor = mix(coreColor, rainbow, rainbowAmount) * selectBoost;
  beamColor += vec3(1.0, 0.95, 0.9) * pulse * 0.3 * selectBoost;

  float alpha = (0.5 + rim * 0.5) * uOpacity;

  gl_FragColor = vec4(beamColor, alpha);
}
`
