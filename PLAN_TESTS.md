# Plan de tests — Pokedev

| Id  | Story | Étapes                                   | Résultat attendu                                    | Type   | Test                               |
| --- | ----- | ---------------------------------------- | --------------------------------------------------- | ------ | ---------------------------------- |
| T01 | 2     | Ouvrir `/devs?type=backend`              | Seuls les devs de type Back-end sont listés         | Auto   | `dex-page.spec.ts`                 |
| T02 | 2     | Saisir « junior » dans la recherche      | Seul Juniorax est listé                             | Auto   | `dex-page.spec.ts`                 |
| T03 | 3     | Ouvrir `/devs/abc`                       | Page introuvable                                    | Auto   | `guards.spec.ts`                   |
| T04 | 4     | Ajouter 6 devs, puis un 7e               | Les boutons « Ajouter » sont désactivés             | Auto   | `team.spec.ts`, `dev-card.spec.ts` |
| T05 | 5     | Composer une équipe, recharger           | L'équipe est conservée                              | Auto   | `team.spec.ts`                     |
| T06 | 6     | Saisir un nom existant                   | « Ce nom est déjà pris. »                           | Auto   | `create-dev-page.spec.ts`          |
| T07 | 6     | Créer un dev valide                      | La fiche du nouveau dev s'ouvre                     | Auto   | `create-dev-page.spec.ts`          |
| T08 | 6     | Saisir un nom puis quitter la page       | Demande de confirmation                             | Manuel | —                                  |
| T09 | 1     | Afficher sur un écran de 360 px de large | Cartes sur une colonne, aucun défilement horizontal | Manuel | —                                  |
