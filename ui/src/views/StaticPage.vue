<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import HeaderImage from '../components/HeaderImage.vue';
import HeaderTitle from '../components/HeaderTitle.vue';
import MainContent from '../components/MainContent.vue';
import RichTextRender from '../components/RichTextRender.vue';

const props = defineProps({
  pageId: {
    default: undefined,
  },
});

const query = gql`
  query getStaticPage($id: String!) {
    Page(id: $id) {
      title
      mainContent
      header {
        url
        filename
      }
    }
  }
`;
const variables = {
  id: props.pageId,
};
const { result, error, loading } = useQuery(query, variables);

const page = computed(() => result?.value?.Page);
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error</div>
  <div v-if="page" style="display: contents;">
    <HeaderImage :image="page.header" />
    <HeaderTitle :title="page.title" />
    <MainContent>
      <RichTextRender :input="page.mainContent" />
    </MainContent>
  </div>
</template>

<style scoped>
</style>
