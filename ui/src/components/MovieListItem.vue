<script setup>

const props = defineProps({
  movie: {
    default: undefined,
  },
});

</script>

<template>
  <div
    class="movie-item"
  >
    <RouterLink :to="{ name: 'movie-detail', params: { id: props.movie.id } }">
      <div>{{ props.movie.director.name }} - {{ props.movie.title }}</div>
    </RouterLink>

  </div>

</template>

<style scoped>
a {
  color: inherit;
}
</style>
