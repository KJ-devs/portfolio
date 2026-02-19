# Équipe — Neural Portfolio

## Agents core (toujours présents)

- **forge** — Team Lead orchestrateur — décompose les US, délègue, gère les feedback loops
- **stabilizer** — Quality gate — `pnpm build` + `pnpm tsc --noEmit` + `pnpm lint`
- **reviewer** — Revue de code qualité + sécurité

## Agents spécialisés (générés pour ce projet)

- **threejs-dev** — Expert React Three Fiber, Three.js, GSAP animations 3D, post-processing, systèmes de particules
- **frontend-dev** — Expert Next.js 15 App Router, UI overlay, Tailwind CSS 4, Zustand, composants HTML
- **data-architect** — Expert types TypeScript, données statiques, Zustand store, d3-force-3d layout

## Composition d'équipe par type de tâche

| Type de tâche | Équipe |
|---------------|--------|
| Setup / config | frontend-dev, stabilizer |
| Types + données + store | data-architect, stabilizer |
| Layout d3-force | data-architect, stabilizer |
| Scène 3D + neurones | threejs-dev, stabilizer |
| Synapses + particules | threejs-dev, stabilizer |
| Caméra + interactions 3D | threejs-dev, stabilizer |
| UI panels + overlays | frontend-dev, stabilizer |
| Recherche + pathfinding | frontend-dev, data-architect, stabilizer |
| Animations intro | threejs-dev, frontend-dev, stabilizer |
| Responsive mobile | frontend-dev, stabilizer |
| Performance 3D | threejs-dev, stabilizer |
| SEO + metadata | frontend-dev, stabilizer |
| Feature complexe (full) | threejs-dev, frontend-dev, reviewer, stabilizer |

## US → Équipe agentique

| US | Titre | Équipe |
|----|-------|--------|
| US-1 | Setup Next.js | frontend-dev, stabilizer |
| US-2 | Modèle de données + Zustand | data-architect, stabilizer |
| US-3 | Layout d3-force-3d | data-architect, stabilizer |
| US-4 | Scène Three.js de base | threejs-dev, stabilizer |
| US-5 | Rendu neurones | threejs-dev, stabilizer |
| US-6 | Rendu synapses | threejs-dev, stabilizer |
| US-7 | Particules | threejs-dev, stabilizer |
| US-8 | Contrôle caméra | threejs-dev, stabilizer |
| US-9 | Panel d'information | frontend-dev, reviewer, stabilizer |
| US-10 | Recherche + pathfinding | frontend-dev, data-architect, stabilizer |
| US-11 | Animation intro | threejs-dev, frontend-dev, stabilizer |
| US-12 | Navbar + légende + mini-map | frontend-dev, stabilizer |
| US-13 | Tooltip hover | threejs-dev, stabilizer |
| US-14 | Responsive mobile | frontend-dev, stabilizer |
| US-15 | Optimisation performances | threejs-dev, stabilizer |
| US-16 | SEO + metadata | frontend-dev, stabilizer |
| US-17 | Easter egg chatbot | frontend-dev, stabilizer |
