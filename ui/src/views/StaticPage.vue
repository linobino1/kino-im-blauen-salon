<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import HeaderTitle from '../components/HeaderTitle.vue';
import RichTextRender from '../components/RichTextRender.vue';

const props = defineProps({
  id: {
    default: undefined,
  },
});

const query = gql`
  query getStaticPage($id: String!) {
    Page(id: $id) {
      title
      mainContent
    }
  }
`;
const variables = {
  id: props.id,
};
const { result, error, loading } = useQuery(query, variables);

const page = computed(() => result?.value?.Page);
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error</div>
  <div v-if="page">
    <HeaderTitle :title="page.title" />

    <RichTextRender :input="page.mainContent" />

  </div>
</template>

<style scoped>
</style>
