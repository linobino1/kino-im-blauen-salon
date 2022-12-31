<script setup>
import { ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import log from 'loglevel';

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
</script>

<template>
  <div class="login-wrapper">
    <div class="login-form">
      <p>Login</p>
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
