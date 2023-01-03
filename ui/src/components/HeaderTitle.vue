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

<style scoped>
.page-header-title {
  color: var(--color-black);
  background: var(--color-white);
  display: flex;
  justify-content: center;
  margin: 0;
}
</style>
