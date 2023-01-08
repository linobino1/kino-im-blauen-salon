<script setup>
const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <h1 class="page-header-title">{{ props?.title }}</h1>
</template>

<style>
.page-header-title {
  width: 100%;
  color: var(--color-black);
  background: var(--color-white);
  display: flex;
  justify-content: center;
  margin: 0;
}
.page-header-title:first-child {
  margin-top: 2rem;
}
</style>
