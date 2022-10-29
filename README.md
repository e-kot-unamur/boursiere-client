# Boursière

## Getting started

Install dependencies.

```sh
npm install -g pnpm
pnpm install
```

Start the server first, then run the client in development mode (with hot-reloading).

```sh
pnpm run dev
```

Build the website files for production into the "dist" folder.

```sh
pnpm run build
```

A lot more information can be found on the [server repo](https://github.com/e-kot-unamur/boursiere-server).

## Pages

| Path          | Description                                                                                                        |
| :------------ | :----------------------------------------------------------------------------------------------------------------- |
| /index.html   | Main page with beers' information (names, prices, quantities, etc.).                                               |
| /index.html#2 | Only display beers of, e.g., bar #2.                                                                               |
| /order.html   | Page to take beer orders. **Authentication** is required.                                                          |
| /order.html#1 | Only display beers of, e.g., bar #1.                                                                               |
| /admin.html   | Administration page that allows to upload beers and manage users. **Authentication** as administrator is required. |

## Improvements
* Mettre à jour les dépendances [Server - Client] @Baetslé
* Modifier le timer [Client] @Floté
* Page de gestion des entrées [Client] @Floté [Server] @Baetslé
* Ajouter un "théme" [Client] @Baetslé
* Extention fichier db - page Admin [Client] @Floté
* Stat admin [Client] @Floté & Baetslé
* Variable Timer pour les tests [Client - Server]
* Ajouter le timer sur la page Order [Client] @Baetslé

* ~~Emoji variation bières [Client] @Baetslé~~

### Deadlines :
* Lundi : RB
* Vendredi : topo
