<script setup>
import { useRouter } from 'vue-router';
import DynamicNavigation from './DynamicNavigation.vue';

const props = defineProps({
  image: {
    type: Object,
    default: () => {},
  },
});
const router = useRouter();
</script>

<template>
  <header class="image" v-if="props.image">
    <img
      class="header-image"
      :src="props.image?.url"
      :alt="props.image?.filename"
    />
    <div class="header-image-overlay">
      <button @click="router.go(-1)" type="button" class="back-button" aria-label="back" />
      <DynamicNavigation type="social" class="header" />
    </div>
  </header>
</template>

<style>
header.image {
  width: 100vw;
  height: 48vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 2rem;
}
.header-image-overlay {
  position: absolute;
  top: 2rem;
  width: 100%;
  padding: 0 10%;
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
.back-button:hover {
  cursor: pointer;
  filter: brightness(0.5);
  transition: filter 0.4s;
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

@media (max-width: 1024px) {
  header.image {
    height: 320px;
  }
}
@media (max-width: 768px) {
  header.image {
    height: 275px;
  }
}
</style>
