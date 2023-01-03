<script setup>
import gql from 'graphql-tag';
import useUserStore from '@/stores/user';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import HeaderTitle from '../components/HeaderTitle.vue';

const userStore = useUserStore();
const isInsider = userStore.isInsider();

const variables = {
  slug: useRoute().params.slug,
};
let query = gql`
  query MovieDetailInsider ($slug: String!) {
    Movies(limit: 1 where: {slug: { equals: $slug } }) {
      docs {
        title
        director {
          name
          dateOfBirth
          dateOfDeath
        }
      }
    }
  }
`;
if (isInsider) {
  query = gql`
    query MovieDetailPublic ($slug: String!) {
      Movies(limit: 1 where: {slug: { equals: $slug } }) {
        docs {
          title
          director {
            name
            dateOfBirth
            dateOfDeath
          }
          mediaUrl
        }
      }
    }
  `;
}

const { result, loading, error } = useQuery(query, variables);
const movie = computed(() => result?.value?.Movies?.docs[0]);
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error</div>
  <div v-if="movie">
    <HeaderTitle :title="movie.title" />
    <h2>{{ movie.title }}</h2>

    <div v-if="isInsider">{{ movie.mediaUrl }}</div>
  </div>
</template>

<style scoped>
</style>
