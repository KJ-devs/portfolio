# Testing — Neural Portfolio

## Framework

Pas de tests unitaires automatisés (portfolio statique 3D — complexité de test R3F élevée).

**Validation = stabilité build + vérification visuelle manuelle**

## Commandes de stabilité

```bash
pnpm build          # Build Next.js production
pnpm tsc --noEmit   # Type check TypeScript strict
pnpm lint           # ESLint + Prettier check
```

## Checklist de validation visuelle (par US)

Pour chaque US livrée, vérifier manuellement :

### Rendu 3D
- [ ] Pas de glitch graphique ou flash blanc
- [ ] FPS > 30 sur 1080p (vérifier avec Stats.js ou Chrome DevTools)
- [ ] Post-processing (Bloom, Vignette) visible
- [ ] Pas d'erreur WebGL dans la console

### Interactions
- [ ] Hover sur neurones fonctionne
- [ ] Clic ouvre le bon panel
- [ ] Camera zoom smooth (GSAP)
- [ ] Auto-rotation en idle

### UI Overlay
- [ ] Panel s'ouvre/ferme correctement
- [ ] Animations GSAP fluides
- [ ] Pas de z-index cassé entre canvas et UI

### Cross-browser
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] (bonus) Safari ✅

### Console
- [ ] Zéro erreur JavaScript
- [ ] Zéro warning React
- [ ] Zéro erreur TypeScript

## Stabilité à chaque US

Avant de passer à l'US suivante :
1. `pnpm build` → passe ✅
2. `pnpm tsc --noEmit` → passe ✅
3. `pnpm lint` → passe ✅
4. Vérification visuelle → OK ✅
