<script setup>
</script>

<template>
  <div class="main-content"><slot /></div>
</template>

<style>
.main-content {
  width: min(100vw, var(--page-max-width));
  margin: 0 auto;
  margin-top: 3rem;
  color: var(--color-white);
  padding-left: 1rem;
  padding-right: 1rem;
}
@media (max-width: 700px) {
  .main-content {
    width: 100%;
  }
}
@media (min-width: 1024px) {
}
</style>
