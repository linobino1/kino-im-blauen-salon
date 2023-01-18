<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import DynamicNavigation from './DynamicNavigation.vue';

const visible = ref(false);

function open() {
  visible.value = true;
}
function close() {
  visible.value = false;
}

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    visible.value = false;
  },
);
</script>

<template>
  <button
    @click="open()"
    type="button"
    class="main-nav-open"
  />
  <div class="main-nav-container" :class="visible && 'visible'">
    <button
      @click="close()"
      type="button"
      class="main-nav-close"
    />
    <DynamicNavigation type="main" />
  </div>
</template>

<style>
  button {
    cursor: pointer;
  }
  button.main-nav-open {
    display: none !important;
    appearance: none;
    border: 0;
    font-size: 4rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-theme);
    background: transparent;
    padding: 0.5rem 1rem;
    padding-right: 0 !important;
  }
  button.main-nav-open::before {
    content: "\2261";
  }

  button.main-nav-close {
    display: none !important;
    appearance: none;
    appearance: none;
    border: 0;
    font-size: 3rem;
    font-weight: var(--font-weight-bold);
    background: transparent;
    padding: 0.5rem 1rem;
    color: var(--color-theme);
  }
  button.main-nav-close::before {
    content: "\2715";
  }

  nav.main {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 1024px) {
    button.main-nav-open,
    button.main-nav-close {
      display: block !important;
    }
    .main-nav-container {
      position: fixed;
      z-index: 1;
      top: 0;
      bottom: 0;
      right: 0;
      max-width: 100vw;
      font-size: var(--font-size-xxx-big);
      background-color: var(--color-white);

      display: flex;
      flex-direction: column !important;
      align-items: end !important;
      padding: 2rem 1rem !important;
      row-gap: 1em !important;

      transition: transform 0.2s ease-in-out;
      transform: translateX(100%);
    }
    .main-nav-container.visible {
      transform: translateX(0);
    }
    nav.main {
      display: flex;
      flex-direction: column;
      align-items: end;
      border: 0 !important;
      row-gap: 1em;
    }
  }
</style>
