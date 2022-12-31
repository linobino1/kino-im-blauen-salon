<script setup>
import useUserStore from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

</script>
<template>
  <nav>
    <RouterLink
      v-if="user?.email"
      to="/auth/me"
    >
      {{ user.email }}
    </RouterLink>
    <RouterLink
      v-else
      to="/auth/login"
    >
      Login
    </RouterLink>
  </nav>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-black);
}
nav a.router-link-exact-active:hover {
  color: inherit;
}
nav a {
  display: inline-block;
  padding: .5rem 1rem;
  color: var(--color-font-light);
  text-transform: uppercase;
}
nav a:hover {
  color: var(--color-theme-contrast);
}
</style>
