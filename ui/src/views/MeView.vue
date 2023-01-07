<script setup>
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import log from 'loglevel';
import HeaderTitle from '../components/HeaderTitle.vue';
import MainContent from '../components/MainContent.vue';

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
  <HeaderTitle title="My Account" />
  <MainContent>
    <button
      @click="logout()"
      type="button"
    >Logout</button>
  </MainContent>
</template>

<style scoped>
</style>
