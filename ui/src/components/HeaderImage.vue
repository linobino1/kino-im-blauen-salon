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
  <header class="main" v-if="props.image">
    <img
      class="page-header-image"
      :src="props.image?.url"
      :alt="props.image?.filename"
    />
    <div class="page-header-image-overlay">
      <button type="button" class="back-button" aria-label="back" />
      <DynamicNavigation type="social" class="header" />
    </div>
  </header>
</template>

<style>
header.main {
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
  align-items: center;
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
header.main .back-button:hover,
nav.social.header a:hover {
  cursor: pointer;
  filter: brightness(0.5);
  transition: filter 0.4s;
}
</style>
