<script setup>
const props = defineProps({
  movie: {
    default: undefined,
  },
});
</script>

<template>
  <div class="movie-item">
    <div>{{ props.movie.title }}</div>
    <div>{{ props.movie.director.name }}</div>

  </div>

</template>

<style scoped>

</style>
