<script setup>
import gql from 'graphql-tag';
import useUserStore from '@/stores/user';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';

const userStore = useUserStore();
const isInsider = userStore.isInsider();

const variables = {
  id: useRoute().params.id,
};
let query = gql`
  query MovieDetailInsider ($id: String!) {
    Movie(id: $id) {
      title
      director {
        name
        dateOfBirth
        dateOfDeath
      }
    }
  }
`;
if (isInsider) {
  query = gql`
    query MovieDetailPublic ($id: String!) {
      Movie(id: $id) {
        title
        director {
          name
          dateOfBirth
          dateOfDeath
        }
        mediaUrl
      }
    }
  `;
}

const { result } = useQuery(query, variables);
</script>

<template>
  <h2>{{ result.Movie.title }}</h2>

  <div v-if="isInsider">{{ result.Movie.mediaUrl }}</div>
</template>

<style scoped>
</style>
