<script setup>
import { inject } from 'vue';
import { RouterView } from 'vue-router';
import MeStatus from './components/MeStatus.vue';
import MainFooter from './components/MainFooter.vue';
import DynamicNavigation from './components/DynamicNavigation.vue';

const conf = inject('conf');
</script>

<template>
  <header class="main">
    <RouterLink :to="{ name: 'home' }">
      <img class="main-logo" :src="conf.Site.favicon.url" alt="logo" />
    </RouterLink>
    <DynamicNavigation type="main" />
    <MeStatus />
  </header>

  <main>
    <RouterView ref="page" :key="$route.fullPath" />
  </main>

  <MainFooter />
</template>

<style>
header.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 10%;
  font-size: var(--font-size-small);
}
header.main > * {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  padding: .5rem;
}
header.main > *:first-child {
  padding-left: 0;
}
header.main > *:last-child {
  padding-right: 0;
}
nav.main {
  width: 85%;
  border-left: 1px solid var(--color-light-grey);
  border-right: 1px solid var(--color-light-grey);
}
.main-logo {
  width: 8rem;
  height: auto;
}

/* Main Navigation  ************************************************************/
nav.main {
  justify-self: end;
}
nav.main a.router-link-exact-active {
  color: var(--color-black);
}
nav.main a.router-link-exact-active:hover {
  color: inherit;
}
nav.main a {
  display: inline-block;
  padding: .5rem 1rem;
  color: var(--color-font-light);
  text-transform: uppercase;
}
nav.main a:hover {
  color: var(--color-theme-contrast);
}
/* Main Navigation End   *******************************************************/
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-theme);
  min-height: 100vh;
  width: 100%;
}
@media (min-width: 1024px) {
}
</style>
