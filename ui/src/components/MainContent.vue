<script setup>
</script>

<template>
  <div class="main-content"><slot /></div>
</template>

<style>
.main-content {
  width: min(100vw, var(--page-max-width));
  margin: 0 auto;
  color: var(--color-white);
  padding: 3rem 1rem 3rem 1rem;
}
@media (max-width: 700px) {
  .main-content {
    width: 100%;
  }
}
@media (min-width: 1024px) {
}
</style>
