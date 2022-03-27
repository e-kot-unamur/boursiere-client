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
