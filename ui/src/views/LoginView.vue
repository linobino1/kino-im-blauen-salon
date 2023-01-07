<script setup>
import { ref, toRaw, provide } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import log from 'loglevel';
import MainContent from '../components/MainContent.vue';
import HeaderTitle from '../components/HeaderTitle.vue';

const router = useRouter();
const userStore = useUserStore();
const email = ref('leo.hilsheimer@gmail.com');
const password = ref('linobino1');

function submit() {
  userStore.login(toRaw(email.value), toRaw(password.value))
    .then(() => {
      router.push({ name: 'home' });
    })
    .catch((err) => {
      log.debug('login failed', err);
    });
}

provide('pageTitle', 'Login');
</script>

<template>
  <HeaderTitle title="Login" />
  <MainContent>
    <div class="login-wrapper">
      <div class="login-form">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
        />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
        />
        <button
          @click="submit()"
          type="button"
        >Submit</button>
      </div>
    </div>
  </MainContent>
</template>

<style scoped>
.login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 50vh;
}
.login-form {
  width: min(90vw, 20rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
}
</style>
