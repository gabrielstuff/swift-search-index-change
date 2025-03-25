<template>
  <AisInstantSearch :widgets :configuration :index="primaryIndex">
    <AisSearchBox placeholder="Search..." autofocus />

    <!-- Companies Index -->
    <AisIndex index="federated_search_companies">
      <h2>Companies</h2>
      <AisHits>
        <template #default="{ items }">
          <div v-for="item in items" :key="item.id">
            {{ item.name }}
          </div>
        </template>
      </AisHits>
      <AisStats>
        <template #default="{ nbHits }">
          <b>{{ nbHits }}</b> {{ nbHits < 2 ? 'company' : 'companies' }}
        </template>
      </AisStats>
      <AisPagination />
    </AisIndex>

    <!-- Users Index -->
    <AisIndex index="federated_search_users">
      <h2>Users</h2>
      <AisHits>
        <template #default="{ items }">
          <div v-for="item in items" :key="item.id">
            {{ item.username }}
          </div>
        </template>
      </AisHits>
      <AisStats>
        <template #default="{ nbHits }">
          <b>{{ nbHits }}</b> {{ nbHits < 2 ? 'user' : 'users' }}
        </template>
      </AisStats>
      <AisPagination />
    </AisIndex>
  </AisInstantSearch>
</template>

<script setup lang="ts">
// Initialize the search client once
const searchClient = typesenseInstantsearchAdapter().searchClient;

// Define the primary index (this is the default index, but both will be searched)
const primaryIndex = 'federated_search_companies'

const indexCompany = useAisIndex({
  indexName: 'federated_search_companies',
})
indexCompany.addWidgets([
  useAisHits({
    escapeHTML: true,
  }),
  useAisClearRefinements(
    {}, 'all',
  ),
  useAisStats({}),
  useAisPagination({ }),
])

const indexUser = useAisIndex({
  indexName: 'federated_search_users',
})
indexUser.addWidgets([
  useAisStats({}),
  useAisPagination({ }),
  useAisHits({
    escapeHTML: true,
  }),
])


const widgets = computed(() => [
  useAisSearchBox({}),
  indexCompany,
  indexUser,
])

const configuration = ref({
  indexName: primaryIndex,
  // routing: algoliaRouter.value,
  searchClient,
})
</script>