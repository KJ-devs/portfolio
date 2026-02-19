# Stratégie Git : Push direct sur main

- **YOU MUST** travailler directement sur `main` — pas de branches feature, pas de PR
- **YOU MUST** commiter avec des commits atomiques et bien nommés
- **YOU MUST** push sur `main` après chaque feature stabilisée

## Workflow Git

```bash
# 1. S'assurer d'être à jour
git pull --rebase origin main

# 2. Développer et commiter au fil de l'eau
git add <fichiers>
git commit -m "type(scope): description"

# 3. Après stabilisation — push direct sur main
git push origin main
```

## Format des commits

- `feat(scope): description courte`
- `fix(scope): description courte`
- `refactor(scope): description courte`
- `test(scope): description courte`

## Règles strictes

- **JAMAIS** de `git push --force` sur main
- **JAMAIS** de branches feature ou de PR
- **YOU MUST** lancer `bash scripts/stability-check.sh` avant de push
- Si le stability check échoue, corriger avant de push
