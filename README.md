# Pokedev

Un pokédex de développeurs, construit avec Angular 22. Tous les devs sont fictifs.

## Prérequis

- Node.js 22.22.3 ou plus, ou 24.15 ou plus
- npm

## Commandes

| Commande                               | Rôle                                               |
| -------------------------------------- | -------------------------------------------------- |
| `npm install`                          | Installer les dépendances                          |
| `npx ng serve`                         | Serveur de développement sur http://localhost:4200 |
| `npx ng test`                          | Tests unitaires Vitest en mode surveillance        |
| `npx ng test --watch=false`            | Tests unitaires, exécution unique                  |
| `npx ng test --watch=false --coverage` | Tests avec rapport de couverture                   |
| `npx ng lint`                          | Analyse statique avec angular-eslint               |
| `npx ng build`                         | Build de production dans `dist/pokedev/browser`    |

## Architecture

```text
public/data/devs.json   les données du pokédex

src/app/
├── domain/        modèle et règles métier : aucune dépendance Angular
├── core/          services transverses
│   ├── data/          chargement, validation et ajout des devs
│   ├── http/          intercepteur et indicateur de chargement
│   ├── navigation/    gardes et resolver de routes
│   ├── storage/       signal persisté dans le localStorage
│   └── team/          l'équipe de l'utilisateur
├── features/      une page par dossier : dex, detail, team, create, not-found
├── shared/        composants d'interface, directive et pipes réutilisables
└── testing/       données de test


```
