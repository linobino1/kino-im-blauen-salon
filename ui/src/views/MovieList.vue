<script setup>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import MovieListItem from '@/components/MovieListItem.vue';
import HeaderTitle from '../components/HeaderTitle.vue';

const query = gql`
  query AllMovies {
    Movies {
      docs {
        id
        slug
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
  <HeaderTitle title="Movies" />
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div
    class="movies-list"
    v-else
    v-for="movie in result.Movies.docs"
    :key="movie"
  >
    <MovieListItem :movie="movie" />
  </div>
</template>

<style scoped>
.movies-list {
  display: flex;
}
</style>
