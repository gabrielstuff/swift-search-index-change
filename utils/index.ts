import * as TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
export const typesenseInstantsearchAdapter = () => {
  const config = useRuntimeConfig();
  return new TypesenseInstantSearchAdapter.default({
    server: {
      apiKey: `8hLCPSQTYcBuK29zY5q6Xhin7ONxHy99`,
      nodes: [
        {
          url: `https://qtg5aekc2iosjh93p.a1.typesense.net`,
        },
      ],
    },
    additionalSearchParameters: {},
    collectionSpecificSearchParameters: {
      federated_search_companies: {
        query_by: 'name',
      },
      federated_search_users: {
        query_by: 'username',
      },
    },
  });
};
