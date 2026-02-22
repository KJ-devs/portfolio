/**
 * Cyberpunk theme GLSL shaders.
 * Holographic glitch neurons + electric arc synapses + data rain background.
 */

// ---------------------------------------------------------------------------
// CyberpunkNeuron — vertex
// ---------------------------------------------------------------------------
export const cyberpunkNeuronVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;

  gl_Position = projectionMatrix * mvPosition;
}
`

// ---------------------------------------------------------------------------
// CyberpunkNeuron — fragment
// ---------------------------------------------------------------------------
export const cyberpunkNeuronFragment = /* glsl */ `
// --- injected: fresnel() from common.glsl.ts (prepended at runtime) ---

uniform float uTime;
uniform vec3  uColor;
uniform float uEmissiveIntensity;
uniform float uHover;
uniform float uOpacity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

// Pseudo-random helper (no texture dependency)
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  // --- Scanlines ---
  float scanline = sin(vUv.y * 200.0 + uTime * 5.0) * 0.1;

  // --- RGB split (chromatic aberration on surface) ---
  float shift = (0.01 + 0.01 * sin(uTime * 3.0)) * (1.0 + uHover * 1.5);
  vec2 uvR = vUv + vec2( shift, 0.0);
  vec2 uvG = vUv;
  vec2 uvB = vUv + vec2(-shift, 0.0);

  // Sample base color with slight per-channel UV variation
  float rChannel = uColor.r + sin(uvR.y * 80.0 + uTime * 4.0) * 0.05;
  float gChannel = uColor.g + sin(uvG.y * 80.0 + uTime * 4.0) * 0.05;
  float bChannel = uColor.b + sin(uvB.y * 80.0 + uTime * 4.0) * 0.05;
  vec3 rgbSplit = vec3(rChannel, gChannel, bChannel);

  // --- Glitch slices ---
  // Horizontal bands that randomly shift, stronger on hover
  float sliceY     = floor(vUv.y * 30.0);
  float sliceRand  = hash(vec2(sliceY, floor(uTime * 8.0)));
  float glitchGate = step(0.92 - uHover * 0.15, sliceRand);
  float glitchShift = (sliceRand - 0.5) * 0.15 * glitchGate;

  // Apply glitch offset to colour lookup
  vec2 glitchUv = vUv + vec2(glitchShift, 0.0);
  float glitchBand = sin(glitchUv.x * 120.0 + uTime * 12.0) * 0.08 * glitchGate;

  // --- Fresnel edge glow ---
  vec3 viewDir = normalize(vViewPosition);
  float rim = fresnel(viewDir, vNormal, 2.5);
  vec3 neonEdge = uColor * rim * (1.5 + uHover * 2.0);

  // --- Combine ---
  vec3 baseColor = rgbSplit + scanline + glitchBand;
  vec3 finalColor = baseColor * uEmissiveIntensity + neonEdge;

  gl_FragColor = vec4(finalColor, uOpacity);
}
`

// ---------------------------------------------------------------------------
// CyberpunkDataRain — vertex
// ---------------------------------------------------------------------------
export const cyberpunkDataRainVertex = /* glsl */ `
uniform float uTime;
uniform float uPointSize;

attribute float aIndex;

varying float vBrightness;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // Perspective divide for point size
  gl_PointSize = uPointSize * (300.0 / -mvPosition.z);

  gl_Position = projectionMatrix * mvPosition;

  // Leading points are brighter — based on Y position within the fall cycle
  // Normalise Y into 0..1 range (higher = brighter, i.e. freshly spawned)
  float normY = clamp((position.y + 50.0) / 100.0, 0.0, 1.0);
  vBrightness = normY;
}
`

// ---------------------------------------------------------------------------
// CyberpunkDataRain — fragment
// ---------------------------------------------------------------------------
export const cyberpunkDataRainFragment = /* glsl */ `
varying float vBrightness;

void main() {
  // Square points — sharp edges via step on gl_PointCoord
  vec2 pc = gl_PointCoord;
  float edge = step(0.1, pc.x) * step(0.1, pc.y)
             * (1.0 - step(0.9, pc.x)) * (1.0 - step(0.9, pc.y));

  if (edge < 0.5) discard;

  // Green-tinted with brightness variation
  float brightness = 0.25 + vBrightness * 0.75;
  vec3 col = vec3(0.0, brightness, brightness * 0.25);

  gl_FragColor = vec4(col, brightness);
}
`
