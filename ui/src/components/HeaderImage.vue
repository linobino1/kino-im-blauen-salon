<script setup>
const props = defineProps({
  image: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <header>
    <img
      class="page-header-image"
      :src="props.image?.url"
      :alt="props.image?.filename"
    />
  </header>
</template>

<style scoped>
header {
  width: 100vw;
  aspect-ratio: 845 / 380;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-header-image {
  width: 100%;
  height: auto;
  min-height: 2rem;
}
</style>
