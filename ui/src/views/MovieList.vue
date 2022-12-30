<script setup>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import MovieItem from '@/components/MovieItem.vue';

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
  <div
    class="movies-list"
    v-else
    v-for="movie in result.Movies.docs"
    :key="movie"
  >
    <MovieItem :movie="movie" />
  </div>
</template>

<style scoped>
.movies-list {
  display: flex;
}
</style>
