# Neural Portfolio — Réseau de Neurones Interactif

## Vision Projet

Portfolio web interactif présenté sous la forme d'un réseau de neurones 3D navigable. Le visiteur explore le parcours, les compétences et les projets du développeur en naviguant à l'intérieur d'un graphe neural animé. Chaque neurone est un noeud cliquable (compétence, projet, expérience), et les connexions (synapses) représentent les liens logiques entre eux. Des impulsions lumineuses parcourent les connexions en permanence, simulant l'activité neuronale.

---

## Stack Technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | Next.js (App Router) | 15.x |
| Langage | TypeScript | 5.x |
| Rendu 3D | Three.js via React Three Fiber (`@react-three/fiber`) | latest |
| Helpers 3D | `@react-three/drei` | latest |
| Post-processing | `@react-three/postprocessing` | latest |
| Animations | GSAP + ScrollTrigger | latest |
| Layout reseau | `d3-force-3d` | latest |
| Styling | Tailwind CSS | 4.x |
| Package Manager | pnpm | latest |
| Linter | ESLint + Prettier | latest |
| Deploiement | Vercel | - |

---

## Architecture Fichiers

```
neural-portfolio/
├── public/
│   ├── fonts/                    # Polices custom (Inter, JetBrains Mono)
│   ├── images/                   # Images statiques (photo profil, logos projets)
│   ├── models/                   # Fichiers 3D optionnels (.glb)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Layout racine (providers, metadata, fonts)
│   │   ├── page.tsx              # Page entree - monte la scene 3D
│   │   └── globals.css           # Styles globaux + Tailwind imports
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── NeuralScene.tsx       # Composant principal R3F <Canvas>
│   │   │   ├── NeuralNetwork.tsx     # Orchestre le reseau (neurones + synapses)
│   │   │   ├── Neuron.tsx            # Composant d'un seul neurone (sphere 3D)
│   │   │   ├── Synapse.tsx           # Connexion entre deux neurones (ligne/tube)
│   │   │   ├── Particles.tsx         # Particules voyageant sur les synapses
│   │   │   ├── BackgroundEffects.tsx # Stars, fog, ambient particles
│   │   │   ├── CameraController.tsx  # Controle camera (orbit + zoom GSAP)
│   │   │   └── PostProcessing.tsx    # Bloom, Vignette, ChromaticAberration
│   │   ├── ui/
│   │   │   ├── InfoPanel.tsx         # Panel lateral detail d'un neurone selectionne
│   │   │   ├── Navbar.tsx            # Barre de navigation overlay (nom, liens)
│   │   │   ├── SearchBar.tsx         # Recherche - active chemin neuronal
│   │   │   ├── LoadingScreen.tsx     # Ecran de chargement avec animation intro
│   │   │   ├── MiniMap.tsx           # Mini carte du reseau (coin bas-droite)
│   │   │   ├── CategoryLegend.tsx    # Legende des couleurs par type de neurone
│   │   │   └── Tooltip.tsx           # Tooltip au hover sur un neurone
│   │   └── shared/
│   │       ├── AnimatedText.tsx      # Texte anime GSAP (titres, labels)
│   │       └── GlowButton.tsx        # Bouton avec effet glow
│   ├── data/
│   │   ├── neurons.ts               # Definition de tous les neurones (type, label, metadata)
│   │   ├── connections.ts            # Definition des connexions entre neurones
│   │   ├── projects.ts              # Donnees detaillees des projets
│   │   ├── experiences.ts           # Donnees detaillees des experiences
│   │   └── skills.ts                # Donnees detaillees des competences
│   ├── hooks/
│   │   ├── useNeuralNetwork.ts      # Hook: calcul positions d3-force, etat du reseau
│   │   ├── useNeuronSelection.ts    # Hook: gestion neurone selectionne + zoom camera
│   │   ├── useParticleSystem.ts     # Hook: systeme de particules sur synapses
│   │   └── useGSAPAnimations.ts     # Hook: animations GSAP reutilisables
│   ├── lib/
│   │   ├── neuralLayout.ts          # Logique d3-force-3d pour positionner les noeuds
│   │   ├── pathfinding.ts           # Algorithme chemin entre 2 neurones (pour recherche)
│   │   ├── colorScheme.ts           # Palette de couleurs par type de neurone
│   │   └── constants.ts             # Constantes (tailles, forces, couleurs, durations)
│   ├── stores/
│   │   └── usePortfolioStore.ts     # Zustand store global (selection, filtres, mode)
│   └── types/
│       ├── neuron.ts                # Types: NeuronType, NeuronData, NeuronCategory
│       ├── connection.ts            # Types: ConnectionData, ConnectionStrength
│       └── portfolio.ts             # Types: Project, Experience, Skill
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## Modele de Donnees

### Neurone (`NeuronData`)

```typescript
type NeuronCategory = 'core' | 'skill' | 'project' | 'experience' | 'contact';

interface NeuronData {
  id: string;                          // ex: "react", "supporthelper", "alternance-2024"
  label: string;                       // Texte affiche sur le neurone
  category: NeuronCategory;
  description: string;                 // Description courte (tooltip)
  size: number;                        // 0.5 a 2.0 - taille relative du neurone
  color?: string;                      // Override couleur (sinon base sur category)
  icon?: string;                       // URL icone/logo optionnel
  metadata: ProjectMeta | ExperienceMeta | SkillMeta | ContactMeta | CoreMeta;
}
```

### Connexion (`ConnectionData`)

```typescript
interface ConnectionData {
  source: string;                      // id du neurone source
  target: string;                      // id du neurone cible
  strength: number;                    // 0.1 a 1.0 - epaisseur + luminosite
  label?: string;                      // Label optionnel sur la connexion
}
```

### Categories et Couleurs

| Categorie | Couleur | Hex | Description |
|-----------|---------|-----|-------------|
| `core` | Blanc/Or | `#F5E6CC` | Neurone central (le developpeur) |
| `skill` | Bleu Cyan | `#00D4FF` | Competences techniques |
| `project` | Violet | `#A855F7` | Projets realises |
| `experience` | Vert Emeraude | `#10B981` | Experiences pro + formation |
| `contact` | Rose | `#F472B6` | Contact, CV, reseaux sociaux |

---

## Donnees du Portfolio (Contenu a integrer)

### Neurone Central (`core`)
- **id**: `"me"`
- **label**: `"J.Krebs"`
- **description**: `"Developpeur Fullstack - Master IA & Big Data"`
- **size**: `2.0`

### Competences (`skill`)

**Frontend :**
- React (size: 1.4)
- Next.js (size: 1.5)
- TypeScript (size: 1.6)
- Tailwind CSS (size: 1.2)
- Three.js (size: 1.0)
- GSAP (size: 1.0)

**Backend :**
- Node.js (size: 1.3)
- NestJS (size: 1.3)
- Python (size: 1.4)
- PostgreSQL (size: 1.2)
- REST API (size: 1.1)

**IA / Data :**
- Machine Learning (size: 1.3)
- TensorFlow (size: 1.0)
- Big Data (size: 1.1)
- NLP (size: 1.0)
- pgvector (size: 0.8)

**DevOps / Outils :**
- Git (size: 1.3)
- Docker (size: 1.1)
- CI/CD (size: 1.0)
- Claude Code (size: 0.9)
- Turborepo (size: 0.8)

### Projets (`project`)

**Projet 1 - supportHelperv2**
- **id**: `"supporthelper"`
- **label**: `"supportHelper v2"`
- **description**: `"Plateforme B2B de gestion de tickets support avec analyse IA et generation automatique de bug reports visuels + issues GitHub"`
- **size**: `1.6`
- **stack**: TypeScript, NestJS, Next.js, PostgreSQL, pgvector, Turborepo
- **highlights**: Multi-agent Forge system, AI-powered analysis, auto GitHub issue generation
- **links**: { github: "https://github.com/KJ-devs/supportHelperv2" }
- Connecte a : TypeScript, NestJS, Next.js, PostgreSQL, pgvector, Turborepo, Machine Learning, me

**Projet 2 - TikTok Educatif**
- **id**: `"tiktok-edu"`
- **label**: `"EduFeed"`
- **description**: `"Application de feed educatif vertical style TikTok avec cartes de concepts generees par IA"`
- **size**: `1.3`
- **stack**: Next.js, TypeScript, Tailwind CSS, AI APIs
- **highlights**: AI-powered concept cards, infinite scroll, personalized learning
- **links**: { github: "#" }
- Connecte a : Next.js, TypeScript, Tailwind CSS, Machine Learning, NLP, me

**Projet 3 - Neural Portfolio (ce site)**
- **id**: `"neural-portfolio"`
- **label**: `"Neural Portfolio"`
- **description**: `"Portfolio interactif en reseau de neurones 3D navigable"`
- **size**: `1.2`
- **stack**: Next.js, Three.js, GSAP, TypeScript, Tailwind CSS
- **links**: { github: "#", live: "#" }
- Connecte a : Next.js, Three.js, GSAP, TypeScript, Tailwind CSS, me

### Experiences (`experience`)

**Experience 1 - Alternance Developpeur Fullstack**
- **id**: `"alternance"`
- **label**: `"Alternance Fullstack"`
- **description**: `"Developpeur fullstack en alternance - conception et developpement d'applications web"`
- **size**: `1.4`
- **period**: "2023 - Present"
- Connecte a : React, TypeScript, Node.js, NestJS, PostgreSQL, Git, Docker, me

**Experience 2 - Master IA & Big Data**
- **id**: `"master-ia"`
- **label**: `"Master IA / Big Data"`
- **description**: `"Master specialise Intelligence Artificielle et Big Data"`
- **size**: `1.3`
- **period**: "2023 - 2025"
- Connecte a : Machine Learning, Python, TensorFlow, Big Data, NLP, me

### Contact (`contact`)

- **GitHub** : id: `"github"`, label: `"GitHub"`, link: `"https://github.com/KJ-devs"`, size: 0.8
- **LinkedIn** : id: `"linkedin"`, label: `"LinkedIn"`, link: `"#"`, size: 0.8
- **Email** : id: `"email"`, label: `"Email"`, link: `"mailto:jeremiekrebs9@gmail.com"`, size: 0.8
- **CV** : id: `"cv"`, label: `"Telecharger CV"`, link: `"/cv.pdf"`, size: 0.8
- Tous connectes a : me

---

## User Stories (US)

### PHASE 1 - Fondation (priorite haute)

#### US-1 : Initialisation du projet Next.js + config de base
**Priorite** : CRITIQUE
**Equipe** : architect, developer, stabilizer
**Description** : Initialiser le projet Next.js 15 avec App Router, TypeScript strict, Tailwind CSS 4, ESLint, Prettier. Configurer les fonts (Inter + JetBrains Mono via `next/font`). Creer la structure de dossiers complete comme definie dans l'architecture. Le fichier `globals.css` doit definir un fond sombre (`#0A0A0F`) et importer Tailwind.
**Criteres d'acceptation** :
- `pnpm dev` demarre sans erreur
- Structure de dossiers exacte comme dans l'architecture
- TypeScript strict mode active
- Tailwind configure avec la palette de couleurs custom (les hex du tableau categories)
- ESLint + Prettier configures et fonctionnels
- Layout racine avec fonts Inter et JetBrains Mono
- Page d'accueil affiche un placeholder "Neural Portfolio"
**Dependances** : Aucune

---

#### US-2 : Modele de donnees et fichiers de donnees
**Priorite** : CRITIQUE
**Equipe** : architect, developer, stabilizer
**Description** : Creer tous les types TypeScript (`types/`) et tous les fichiers de donnees (`data/`) avec le contenu exact decrit dans la section "Donnees du Portfolio". Creer le Zustand store (`stores/usePortfolioStore.ts`) avec les etats : `selectedNeuron`, `hoveredNeuron`, `searchQuery`, `activeCategories`, `isIntroComplete`, `isPanelOpen`.
**Criteres d'acceptation** :
- Tous les types dans `types/` sont definis et exportes
- Tous les fichiers `data/` contiennent les neurones et connexions exactement comme definis
- Le store Zustand est fonctionnel avec tous les etats et actions
- Aucune erreur TypeScript (`pnpm tsc --noEmit` passe)
- Les donnees incluent au minimum : 1 neurone core, 20 skills, 3 projets, 2 experiences, 4 contacts
- Toutes les connexions entre neurones sont definies selon les liens decrits
**Dependances** : US-1

---

#### US-3 : Layout du reseau avec d3-force-3d
**Priorite** : CRITIQUE
**Equipe** : architect, developer, stabilizer
**Description** : Implementer `lib/neuralLayout.ts` et `hooks/useNeuralNetwork.ts` pour calculer automatiquement les positions 3D de tous les neurones via d3-force-3d. Les forces doivent etre : repulsion entre tous les noeuds (`forceManyBody`), attraction sur les liens (`forceLink`), centrage (`forceCenter`), et une force de regroupement par categorie pour que les neurones du meme type soient proches. Le neurone `"me"` doit etre au centre (position fixe `[0, 0, 0]`). Le hook doit retourner les positions calculees et exposer une methode `recalculate()`.
**Criteres d'acceptation** :
- d3-force-3d installe et fonctionnel
- Les positions sont calculees automatiquement pour tous les neurones
- Le neurone central est fixe a l'origine
- Les neurones du meme type sont regroupes spatialement
- Les neurones connectes sont plus proches
- La simulation se stabilise en moins de 2 secondes
- Le hook expose `nodes`, `links`, `isReady`, `recalculate`
**Dependances** : US-2

---

### PHASE 2 - Rendu 3D (priorite haute)

#### US-4 : Scene Three.js de base avec React Three Fiber
**Priorite** : CRITIQUE
**Equipe** : developer, stabilizer
**Description** : Creer `NeuralScene.tsx` avec un `<Canvas>` R3F. Configurer : camera perspective (fov 60, position initiale `[0, 0, 50]`), ambientLight, pointLight. Ajouter `BackgroundEffects.tsx` avec `<Stars>` de drei pour le fond spatial. Ajouter `PostProcessing.tsx` avec Bloom (intensity 1.5, luminanceThreshold 0.6), Vignette (offset 0.3, darkness 0.7). Monter la scene dans `page.tsx` avec `dynamic import` et `ssr: false`.
**Criteres d'acceptation** :
- La scene 3D se charge sans erreur
- Le fond est noir avec des etoiles animees
- Le post-processing Bloom + Vignette est visible
- Le canvas est responsive (100vw x 100vh)
- Aucune erreur SSR (le canvas est charge cote client uniquement)
- Les performances sont superieur a 30 FPS sur un ecran 1080p
**Dependances** : US-1

---

#### US-5 : Rendu des neurones (spheres 3D)
**Priorite** : CRITIQUE
**Equipe** : developer, stabilizer
**Description** : Creer `Neuron.tsx` - chaque neurone est une sphere 3D (`<Sphere>` de drei) positionnee selon les coordonnees de d3-force. La taille de la sphere correspond a `neuron.size`. Le materiau utilise `MeshStandardMaterial` avec `emissive` regle sur la couleur de la categorie et `emissiveIntensity` qui augmente au hover (via `onPointerOver`/`onPointerOut`). Utiliser `<Float>` de drei pour un leger mouvement de flottement. Afficher le label du neurone via `<Html>` de drei, centre sous la sphere, avec une police JetBrains Mono, couleur blanche, et opacite reduite quand la camera est loin. Creer `NeuralNetwork.tsx` qui itere sur tous les neurones et les rend.
**Criteres d'acceptation** :
- Tous les neurones sont visibles dans la scene 3D
- Chaque neurone a la bonne couleur selon sa categorie
- Les neurones plus importants (size eleve) sont plus gros
- Le label est lisible sous chaque neurone
- Au hover, le neurone s'illumine (emissiveIntensity augmente)
- Le neurone central est nettement plus gros que les autres
- Le flottement est subtil et naturel
**Dependances** : US-3, US-4

---

#### US-6 : Rendu des synapses (connexions)
**Priorite** : HAUTE
**Equipe** : developer, stabilizer
**Description** : Creer `Synapse.tsx` - chaque connexion est rendue comme une ligne (`<Line>` de drei) entre deux neurones. L'epaisseur depend de `connection.strength` (entre 0.5 et 3 pixels). La couleur est un gradient entre les couleurs des deux neurones connectes, avec opacite reduite (0.15 a 0.4 selon strength). Quand un neurone est selectionne, les synapses qui lui sont connectees s'illuminent (opacite 0.8) et les autres deviennent quasi-invisibles (opacite 0.05).
**Criteres d'acceptation** :
- Toutes les connexions sont visibles entre les neurones lies
- L'epaisseur varie selon la force de connexion
- Au clic sur un neurone, ses connexions s'illuminent
- Les connexions non liees au neurone selectionne s'estompent
- Les transitions d'opacite sont animees (smooth)
**Dependances** : US-5

---

#### US-7 : Particules sur les synapses
**Priorite** : HAUTE
**Equipe** : developer, stabilizer
**Description** : Creer `Particles.tsx` et `hooks/useParticleSystem.ts`. Des petites spheres lumineuses (points) voyagent le long des synapses, simulant des impulsions neuronales. Utiliser un systeme de `THREE.Points` avec un `BufferGeometry`. Chaque particule a une position qui progresse le long d'une connexion (interpolation lineaire entre source et target). La vitesse varie legerement par particule. Il y a 1-3 particules par synapse en permanence. Quand un neurone est clique, une "vague" de particules se propage depuis ce neurone vers tous ses voisins (effet de propagation).
**Criteres d'acceptation** :
- Des particules lumineuses circulent en permanence sur les synapses
- La vitesse est variable et naturelle
- Au clic sur un neurone, une impulsion visible se propage
- Les particules ont un leger glow (grace au Bloom du post-processing)
- Les performances restent superieur a 30 FPS avec toutes les particules actives
**Dependances** : US-6

---

### PHASE 3 - Interactions (priorite haute)

#### US-8 : Controle camera et navigation
**Priorite** : CRITIQUE
**Equipe** : developer, stabilizer
**Description** : Creer `CameraController.tsx`. En mode libre (rien selectionne) : la camera tourne doucement autour du reseau en auto-rotation (`OrbitControls` de drei avec `autoRotate`, `autoRotateSpeed: 0.3`). L'utilisateur peut orbiter (drag), zoomer (scroll), et pan (right-click drag). Quand un neurone est clique : utiliser GSAP pour animer la camera en smooth vers le neurone selectionne (`gsap.to` sur la position de la camera et le target, duration 1.5s, ease `power3.inOut`). Quand on ferme le panel : GSAP anime le retour a une vue d'ensemble.
**Criteres d'acceptation** :
- L'auto-rotation fonctionne en idle
- L'utilisateur peut orbiter, zoomer, pan librement
- Au clic sur un neurone, la camera zoom en smooth vers lui (GSAP)
- L'animation dure environ 1.5 secondes avec un ease agreable
- En revenant a la vue globale, la transition est fluide
- Les limites de zoom empechent d'aller trop pres ou trop loin
**Dependances** : US-5

---

#### US-9 : Panel d'information lateral
**Priorite** : CRITIQUE
**Equipe** : developer, stabilizer
**Description** : Creer `InfoPanel.tsx`. Quand un neurone est selectionne, un panel glisse depuis la droite (animation GSAP `fromTo` avec `x: '100%'` vers `x: '0%'`, duration 0.6s, ease `power2.out`). Le contenu du panel depend du type de neurone :
- **Skill** : nom, niveau de maitrise (barre animee), projets lies
- **Project** : titre, description, stack (badges), highlights, liens GitHub/live
- **Experience** : titre, periode, description, competences developpees
- **Contact** : lien direct (ouvre dans un nouvel onglet ou mailto)
- **Core** : bio courte, photo, titre
Le panel a un bouton de fermeture (croix) et se ferme aussi en cliquant dans le vide de la scene. Le fond du panel est semi-transparent avec un backdrop blur.
**Criteres d'acceptation** :
- Le panel s'ouvre avec animation GSAP au clic sur un neurone
- Le contenu est adapte au type de neurone
- Le panel se ferme au clic sur la croix ou dans le vide
- Le design est propre avec fond glassmorphism (backdrop-blur)
- Le panel est responsive (plein ecran sur mobile)
- Les neurones connectes sont listes comme liens cliquables dans le panel
**Dependances** : US-8

---

#### US-10 : Barre de recherche avec pathfinding
**Priorite** : MOYENNE
**Equipe** : developer, stabilizer
**Description** : Creer `SearchBar.tsx` en haut de l'ecran (overlay). L'utilisateur tape un mot-cle. Un dropdown montre les neurones qui matchent (recherche fuzzy sur `label` et `description`). Quand l'utilisateur selectionne un resultat, la camera zoom vers le neurone et une impulsion lumineuse trace le chemin depuis le neurone central `"me"` jusqu'au neurone cible (via `lib/pathfinding.ts` qui utilise un BFS sur le graphe de connexions). Implementer `pathfinding.ts` avec un algorithme de plus court chemin (BFS).
**Criteres d'acceptation** :
- La barre de recherche est accessible via `Ctrl+K` ou en cliquant
- La recherche filtre en temps reel avec fuzzy matching
- Le dropdown affiche les resultats avec categorie et icone
- Le chemin neuronal est visuellement anime (particules qui suivent le chemin)
- La camera zoom sur le neurone selectionne
**Dependances** : US-7, US-8

---

### PHASE 4 - Polish (priorite moyenne)

#### US-11 : Animation d'intro (loading + build)
**Priorite** : HAUTE
**Equipe** : developer, stabilizer
**Description** : Creer `LoadingScreen.tsx`. Au premier chargement : un ecran noir avec le texte "Initializing Neural Network..." apparait en typewriter (GSAP `text` plugin ou custom). Puis la scene se revele : les neurones apparaissent un par un avec un `stagger` GSAP (0.05s par neurone), en partant du centre (`"me"`) et en s'etendant vers les voisins (propagation BFS). Les synapses se dessinent entre les neurones deja apparus. Une fois la construction terminee, l'ecran de loading se dissout et l'auto-rotation commence. Utiliser `gsap.timeline()` pour sequencer toutes les animations.
**Criteres d'acceptation** :
- L'ecran de loading s'affiche pendant le chargement initial
- Le texte "Initializing Neural Network..." apparait en typewriter
- Les neurones apparaissent un par un depuis le centre
- Les synapses se dessinent progressivement
- L'ensemble est fluide et prend entre 3 et 5 secondes
- L'animation ne se rejoue pas au changement de route (state `isIntroComplete`)
**Dependances** : US-7

---

#### US-12 : Navbar overlay + legende + mini-map
**Priorite** : MOYENNE
**Equipe** : developer, stabilizer
**Description** : Creer `Navbar.tsx` : barre fixe en haut, semi-transparente, avec le nom "J.KREBS" a gauche et les liens rapides a droite (GitHub, LinkedIn, CV). Creer `CategoryLegend.tsx` : petite legende en bas a gauche montrant les 5 categories avec leur couleur (cliquable pour filtrer). Creer `MiniMap.tsx` : vue 2D simplifiee du reseau en bas a droite (canvas 2D ou SVG), montrant la position actuelle de la camera.
**Criteres d'acceptation** :
- La navbar est visible et non intrusive
- La legende des categories est cliquable et filtre les neurones
- Quand une categorie est desactivee, les neurones correspondants deviennent transparents
- La mini-map reflete la position dans le reseau
- Tous les elements UI sont responsive
**Dependances** : US-9

---

#### US-13 : Tooltip au hover
**Priorite** : MOYENNE
**Equipe** : developer, stabilizer
**Description** : Creer `Tooltip.tsx`. Quand la souris survole un neurone, un tooltip apparait au-dessus de la sphere (via `<Html>` de drei) avec le label et la description courte du neurone. L'apparition est animee avec GSAP (fade + scale de 0.8 a 1, duration 0.2s). Le tooltip disparait avec un leger delay (0.1s) pour eviter le flickering.
**Criteres d'acceptation** :
- Le tooltip apparait au hover sur chaque neurone
- Le tooltip montre label + description courte
- L'animation est rapide et smooth
- Le tooltip ne cause pas de flickering
- Le tooltip ne s'affiche pas si un panel est deja ouvert
**Dependances** : US-5

---

#### US-14 : Responsive mobile + touch
**Priorite** : MOYENNE
**Equipe** : developer, stabilizer
**Description** : Adapter l'ensemble du portfolio pour mobile. Sur mobile : le panel d'info s'ouvre en plein ecran (bottom sheet). Les controles tactiles fonctionnent (pinch to zoom, drag to orbit, tap to select). La navbar est adaptee (hamburger menu). La mini-map est masquee. Les labels des neurones sont masques a distance et n'apparaissent qu'au zoom. La recherche est accessible via un bouton flottant.
**Criteres d'acceptation** :
- Le site est utilisable sur mobile (iOS Safari, Chrome Android)
- Les gestes tactiles fonctionnent (pinch, drag, tap)
- Le panel est un bottom sheet sur mobile
- Les performances sont acceptables (superieur a 24 FPS sur mobile recent)
- Les labels ne surchargent pas l'ecran sur mobile
**Dependances** : US-9, US-12

---

#### US-15 : Optimisation performances
**Priorite** : MOYENNE
**Equipe** : developer, stabilizer
**Description** : Optimiser les performances du portfolio. Implementer : LOD (Level of Detail) - les neurones lointains ont moins de segments dans leur geometrie. Frustum culling active. Instanced rendering pour les neurones du meme type si possible. Limiter le nombre de particules actives. Utiliser `useFrame` avec delta time pour des animations framerate-independantes. Profiler avec React DevTools + Chrome Performance tab.
**Criteres d'acceptation** :
- 60 FPS sur desktop
- 30+ FPS sur mobile recent
- Le temps de chargement initial est inferieur a 3 secondes
- Lighthouse performance score superieur a 80
- Pas de memory leak detecte apres 5 minutes d'utilisation
**Dependances** : US-11

---

### PHASE 5 - Extras (priorite basse)

#### US-16 : SEO + Metadata + OG Image
**Priorite** : BASSE
**Equipe** : developer, stabilizer
**Description** : Configurer les metadata Next.js dans `layout.tsx` : title, description, Open Graph image (creer une image statique du reseau), Twitter Card. Ajouter un `robots.txt` et un `sitemap.xml`. Structured data JSON-LD pour un profil de personne.
**Criteres d'acceptation** :
- Les metadata sont correctes dans le `<head>`
- L'OG image s'affiche dans les partages sociaux
- Le site est indexable
- Le score SEO Lighthouse est superieur a 90
**Dependances** : US-14

---

#### US-17 : Easter egg "Ask my brain"
**Priorite** : BASSE
**Equipe** : developer, stabilizer
**Description** : Ajouter un neurone cache dans le reseau (categorie speciale) qui, au clic, ouvre un mini-chatbot. Le chatbot repond aux questions sur J.KREBS en se basant sur les donnees du portfolio (pas d'API IA, juste des reponses pre-programmees avec fuzzy matching sur des mots-cles). Le neurone est legerement cache (petite taille, dans un coin du reseau) et pulse avec une couleur differente (dore).
**Criteres d'acceptation** :
- Le neurone cache est difficile mais pas impossible a trouver
- Le chatbot repond a au moins 10 questions typiques
- L'interface du chatbot est integree dans le panel info
- Le neurone pulse avec un glow dore distinct
**Dependances** : US-9

---

## Ordre d'execution

```
US-1  -> US-2  -> US-3  -> US-4  -> US-5  -> US-6  -> US-7
                                      |
                                    US-8  -> US-9  -> US-10
                                              |
                                    US-11 -> US-12 -> US-13 -> US-14 -> US-15
                                                                          |
                                                                US-16 -> US-17
```

Sequentiel strict : chaque US doit etre terminee et stable avant de passer a la suivante.

---

## Conventions Code

### TypeScript
- Mode `strict` active, zero `any`
- Interfaces pour les props de composants, types pour les unions/utilitaires
- Named exports uniquement (pas de `export default`)
- Chemins absolus avec `@/` alias pour `src/`

### React / Next.js
- Composants fonctionnels uniquement avec hooks
- `'use client'` explicite sur tous les composants qui utilisent hooks/state/effects
- Naming : PascalCase pour les composants, camelCase pour les hooks
- Pas de `React.FC`, utiliser la syntaxe `function Component(props: Props) { }`

### Three.js / R3F
- Tous les composants 3D dans `components/canvas/`
- Les composants UI (HTML overlay) dans `components/ui/`
- Ne jamais melanger les deux dans un meme fichier
- Utiliser `useFrame` pour les animations par frame, GSAP pour les transitions discretes

### GSAP
- Centraliser les configurations dans `hooks/useGSAPAnimations.ts`
- Toujours cleanup les animations dans `useEffect` return
- Utiliser `gsap.context()` pour le scoping
- Eases par defaut : `power2.out` pour les entrees, `power3.inOut` pour les mouvements de camera

### Commits
- Format : `type(scope): description`
- Types : `feat`, `fix`, `style`, `refactor`, `perf`, `test`, `chore`
- Scope = composant principal modifie
- Exemple : `feat(neuron): add hover glow effect`

### Style
- Tailwind pour tout le styling des composants UI
- Pas de fichiers CSS separes (sauf `globals.css`)
- Classes utilitaires, pas de `@apply` sauf cas exceptionnel
- Theme couleur coherent avec la palette definie

---

## Criteres de Stabilite (par US)

Chaque US est consideree stable quand :
1. `pnpm build` passe sans erreur
2. `pnpm tsc --noEmit` passe sans erreur
3. `pnpm lint` passe sans erreur ni warning
4. Le rendu visuel est correct (pas de glitch, pas de flash blanc, pas d'element manquant)
5. Les performances sont dans les seuils definis (30+ FPS minimum)
6. Le comportement est coherent sur Chrome et Firefox
7. Aucune erreur dans la console navigateur

---

## Dependances NPM a installer

```bash
# Core
pnpm add next react react-dom

# TypeScript
pnpm add -D typescript @types/react @types/react-dom @types/node

# 3D
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing

# Animations
pnpm add gsap

# Layout
pnpm add d3-force-3d
pnpm add -D @types/d3-force-3d

# State
pnpm add zustand

# Styling
pnpm add -D tailwindcss @tailwindcss/postcss postcss

# Linting
pnpm add -D eslint prettier eslint-config-next eslint-config-prettier
```

---

## Notes Importantes pour Claude Code

- **Zero intervention humaine** : le `/init-project` doit creer toutes les issues et le `/next-feature` doit implementer chaque US de bout en bout sans poser de question
- **Pas de fichiers placeholder** : chaque fichier cree doit contenir du code fonctionnel et complet
- **Pas de TODO dans le code** : tout doit etre implemente, pas de `// TODO: implement later`
- **Les donnees sont definies ici** : utiliser exactement les neurones, connexions et metadonnees definies dans ce document
- **GSAP est la lib d'animation principale** : l'utiliser pour toutes les transitions UI, mouvements de camera, et sequences d'intro
- **Three.js via R3F uniquement** : ne jamais instancier Three.js en imperatif, toujours passer par les composants R3F
- **Tester visuellement apres chaque US** : lancer `pnpm dev` et verifier que le rendu est correct
- **Ne pas over-engineer** : commencer simple, chaque US ajoute une couche de complexite
- **Privilegier la performance** : si un effet visuel coute trop cher en FPS, le simplifier
