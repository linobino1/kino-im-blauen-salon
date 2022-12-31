<script setup>
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import log from 'loglevel';

const router = useRouter();
const userStore = useUserStore();

function logout() {
  userStore.logout()
    .then(() => {
      router.push({ name: 'home' });
    })
    .catch((err) => {
      log.debug('logout failed', err);
    });
}
</script>

<template>
  <button
    @click="logout()"
    type="button"
  >Logout</button>
</template>

<style scoped>
</style>
