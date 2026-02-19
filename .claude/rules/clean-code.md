# Clean Code — Neural Portfolio

## TypeScript

- Mode `strict` activé — zero `any`, zero `as unknown`
- Interfaces pour les props de composants
- Types pour les unions, utilitaires, primitives complexes
- Pas de `React.FC` — utiliser `function Component(props: Props) {}`
- Named exports uniquement — pas de `export default`
- Alias `@/` pour tous les imports depuis `src/`

## Nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Composants React | PascalCase | `NeuralScene`, `InfoPanel` |
| Hooks | camelCase + `use` | `useNeuralNetwork`, `useGSAPAnimations` |
| Types/Interfaces | PascalCase | `NeuronData`, `ConnectionData` |
| Constantes | SCREAMING_SNAKE ou camelCase | `NEURON_SIZES`, `defaultCamera` |
| Fichiers composants | PascalCase.tsx | `Neuron.tsx` |
| Fichiers hooks/lib | camelCase.ts | `neuralLayout.ts` |
| Fichiers types | camelCase.ts | `neuron.ts` |

## Anti-patterns interdits

❌ `any` → ✅ Type précis ou `unknown` avec garde
❌ `export default` → ✅ `export function` / `export const`
❌ Logique métier dans les composants → ✅ hooks ou lib/
❌ Imports relatifs `../../..` → ✅ Alias `@/`
❌ `console.log` en production → ✅ Supprimé avant commit
❌ Code commenté → ✅ Supprimé
❌ `// TODO:` → ✅ Issue GitHub créée
❌ `useEffect` sans cleanup sur GSAP → ✅ `return () => ctx.revert()`
❌ Géométries Three.js créées dans render → ✅ `useMemo`
❌ `'use client'` manquant sur composant avec hooks → ✅ Toujours explicite

## Organisation des imports

```typescript
// 1. React
import { useState, useEffect } from 'react'

// 2. Next.js
import { useRouter } from 'next/navigation'

// 3. Libs externes (alphabétique)
import { gsap } from 'gsap'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 4. Imports internes @/ (alphabétique)
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { NeuronData } from '@/types/neuron'
```

## Taille et complexité

- Fichier : max 200 lignes (exception : fichiers de données)
- Fonction/hook : max 50 lignes
- Composant : max 100 lignes de JSX
- Props : max 8 props par composant — sinon créer un objet de config

## Styling

- Tailwind CSS uniquement pour les composants UI (`components/ui/`)
- Pas de `@apply` sauf dans `globals.css` pour des classes réutilisées +5 fois
- Pas de styles inline React (`style={{}}`) sauf pour valeurs dynamiques Three.js
- Pas de fichiers `.css` séparés (sauf `globals.css`)
