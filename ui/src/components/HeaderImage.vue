<script setup>
import DynamicNavigation from './DynamicNavigation.vue';

const props = defineProps({
  image: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <header v-if="props.image">
    <img
      class="page-header-image"
      :src="props.image?.url"
      :alt="props.image?.filename"
    />
    <div class="page-header-image-overlay">
      <button type="button" class="back-button" aria-label="back" />
      <DynamicNavigation type="social" />
    </div>
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
  position: relative;
}
.page-header-image {
  width: 100%;
  height: auto;
  min-height: 2rem;
}
.page-header-image-overlay {
  position: absolute;
  max-width: var(--page-max-width);
  top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.back-button {
  appearance: none;
  border: none;
  background: none;
  color: var(--color-white);
  font-family: sans-serif;
  font-size: 2rem;
}
.back-button::before {
  content: '\003C';
}
nav.social {
  display: flex;
  flex-direction: row;
}
</style>
