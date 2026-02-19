# Stabilité — Neural Portfolio

## Commandes

```bash
# Package manager : pnpm
pnpm build           # Build Next.js (vérifie SSR, imports, bundling)
pnpm tsc --noEmit    # Type check TypeScript strict (zero tolérance)
pnpm lint            # ESLint + Prettier

# Stability check complet
bash scripts/stability-check.sh
```

## Seuils

| Check | Seuil | Bloquant |
|-------|-------|---------|
| Build | 0 erreur | ✅ oui |
| TypeScript | 0 erreur | ✅ oui |
| ESLint | 0 erreur | ✅ oui |
| FPS | > 30 FPS desktop | ✅ oui |
| Console errors | 0 | ✅ oui |

## Règles spécifiques R3F

- Le `<Canvas>` DOIT être dans un `dynamic import` avec `ssr: false`
- Les imports Three.js ne doivent jamais arriver côté serveur
- Les géométries et matériaux Three.js doivent être `dispose()` dans les cleanups
- GSAP contexts doivent être `revert()` dans les `useEffect` cleanup

## Script de stabilité

```bash
bash scripts/stability-check.sh
```

Doit retourner `STABLE ✓` avant tout commit sur main.
