# Architecture — Neural Portfolio

## Stack
Next.js 15 (App Router) + TypeScript strict + React Three Fiber + GSAP + Tailwind CSS 4 + Zustand + d3-force-3d + pnpm

## Structure des dossiers

```
src/
├── app/           → Layout racine, page entrypoint UNIQUEMENT
├── components/
│   ├── canvas/    → UNIQUEMENT composants R3F (Three.js, dans <Canvas>)
│   └── ui/        → UNIQUEMENT composants HTML overlay (DOM)
├── data/          → Données statiques du portfolio (neurones, connexions)
├── hooks/         → Hooks React réutilisables (useNeuralNetwork, useGSAP...)
├── lib/           → Logique pure sans React (d3-force, pathfinding, colors)
├── stores/        → Zustand stores globaux
└── types/         → Types TypeScript partagés
```

## Règles fondamentales

### Séparation Canvas / UI
- `components/canvas/` : JAMAIS de DOM HTML, JAMAIS de Tailwind
- `components/ui/` : JAMAIS d'imports Three.js ou R3F
- Pour afficher du HTML dans la scene 3D : utiliser `<Html>` de @react-three/drei uniquement dans canvas/

### Composants R3F
- Tous les composants R3F sont dans `components/canvas/`
- Le `<Canvas>` R3F est monté dans `page.tsx` via `dynamic import` avec `ssr: false`
- `useFrame` pour animations par frame (framerate-dépendant)
- GSAP pour transitions discrètes (zoom camera, apparition UI)
- Cleanup obligatoire dans `useEffect` return (GSAP kill, Three.js dispose)

### State management
- Zustand (`stores/usePortfolioStore.ts`) pour l'état global UI
- Pas de prop drilling profond — passer par le store
- États locaux (useState) uniquement pour UI éphémère (hover, focus)

### Logique pure
- `lib/` contient de la logique sans hooks ni JSX
- `hooks/` wrappent la logique `lib/` en hooks React
- Les composants appellent des hooks — pas de logique métier dans les composants

### Data
- Les fichiers `data/` sont des constantes TypeScript exportées
- Pas d'appels API (portfolio statique) — toutes les données sont en dur
- Imports uniquement des types depuis `types/`

### Performance
- `useFrame` avec delta time pour framerate-independence
- `useMemo` pour les géométries Three.js coûteuses
- `useCallback` pour les handlers événements dans useFrame
- Pas de re-render inutile : séparer les composants qui animent fréquemment
