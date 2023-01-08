<script setup>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import ScreeningListItem from '../components/ScreeningListItem.vue';
import HeaderTitle from '../components/HeaderTitle.vue';
import MainContent from '../components/MainContent.vue';
import HeaderImage from '../components/HeaderImage.vue';

const props = defineProps({
  pageId: {
    default: undefined,
  },
});

const query = gql`
  query ScreeningList($pageId: String!) {
    Page(id: $pageId) {
      title
      header {
        url
        filename
      }
    }
    Screenings {
      docs {
        title
        slug
        date
        time
        media {
          movie {
            title
            header {
              url
            }
            director {
              name
            }
          }
        }
      }
    }
  }
`;
const variables = {
  pageId: props.pageId,
};
const { result, loading, error } = useQuery(query, variables);

const page = computed(() => result?.value?.Page);
const screenings = computed(() => result?.value?.Screenings?.docs);
</script>

<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else style="display: contents;">
    <HeaderImage :image="page.header" />
    <HeaderTitle :title="page.title" />
    <MainContent>
      <div
        class="screenings-list"
        v-for="screening in screenings"
        :key="screening"
      >
        <ScreeningListItem :screening="screening" />
      </div>
    </MainContent>
  </div>
</template>

<style>
.screenings-list {
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 1024px) {
  .screenings-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .screenings-list {
    grid-template-columns: 1fr;
  }
}
</style>
