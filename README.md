# Nuxt Swift search federated search index change

The goal of this project is to show how to change the index used by instantsearch.js in order to make a federated search on :

- federated_search_users
- federated_search_companies

One box to search for multiple records like in the demo here : https://federated-search.typesense.org/ and there: https://u57wjd-3000.csb.app/

For this demo purpose we use the typesense instantsearch adapter and the server created by typesense.

You might need to update the `./utils/index.ts` with the new adress of the server you can find there : https://federated-search.typesense.org/


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

