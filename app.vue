<template>
  Current index: {{ currentIndex }}<br/>
  <select v-model="currentIndex">
    <option value="federated_search_users">Change to users</option>
    <option value="federated_search_companies">Change to companies</option>
  </select>
  <AisInstantSearch :widgets :configuration>
    <AisSearchBox placeholder="Search..." autofocus />
    <AisIndex :index="currentIndex">
      <AisStats>
        <template #default="{ nbHits }">
          <b>{{ nbHits }}</b> {{ nbHits < 2 ? 'item' : 'items' }} </template>
      </AisStats>
      <AisPagination />
    </AisIndex>
  </AisInstantSearch>
</template>
<script setup lang="ts">
import { connectSearchBox } from 'instantsearch.js/es/connectors'

const currentIndex = ref('federated_search_companies')

const virtualSearchBox = connectSearchBox(() => null)

const indexCompany = useAisIndex({
  indexName: 'federated_search_companies',
})
indexCompany.addWidgets([
  virtualSearchBox({}),
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

const client = typesenseInstantsearchAdapter().searchClient
const algoliaRouter = useAisRouter()

const widgets = computed(() => [
  useAisSearchBox({}),
  indexCompany,
  indexUser,
])

const configuration = ref({
  indexName: computed(() => currentIndex.value), // TODO: update is not changing the indexName used by instantsearch
  // routing: algoliaRouter.value,
  searchClient: client,
})
const { getInstance } = useInstantSearch()
</script>