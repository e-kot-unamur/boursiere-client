# Boursière

## Getting started

Install dependencies.

```sh
npm install -g pnpm
pnpm install
```

Start the [server](https://github.com/e-kot-unamur/boursiere-server) first, then run the client in development mode (with hot-reloading).

```sh
pnpm run dev
```

Build the website files for production into the "dist" folder.

```sh
pnpm run build
```

## Pages

| Path        | Description                                                                                                                                   |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| /index.html | Main page with beers' information (names, prices, quantities, etc.).                                                                          |
| /order.html | Page to take beer orders. **Authentication** is required.                                                                                     |
| /admin.html | Administration page that allows to manage users, start/stop the event, override prices, etc. **Authentication** as administrator is required. |
