<script setup lang="ts">
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

const query = gql`
  query AllMovies {
    Movies {
      docs {
          title
          director {
            name
          }
      }
    }
  }
`;
const { result, loading, error } = useQuery(query);

</script>

<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else v-for="movie in result.Movies.docs" :key="movie">
    {{ movie.director.name }} - {{ movie.title }}
  </div>
</template>
