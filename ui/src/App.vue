<script setup>
import { inject } from 'vue';
import { RouterView } from 'vue-router';
import MeStatus from './components/MeStatus.vue';
import MainFooter from './components/MainFooter.vue';
import MainNavigation from './components/MainNavigation.vue';

const conf = inject('conf');
</script>

<template>
  <header class="main">
    <RouterLink :to="{ name: 'home' }">
      <img class="main-logo" :src="conf.Site.favicon?.url" alt="logo" />
    </RouterLink>
    <MainNavigation />
    <MeStatus />
  </header>

  <main>
    <RouterView ref="page" :key="$route.fullPath" />
  </main>

  <MainFooter />
</template>

<style>
header.main {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  width: 100%;
  padding: 0 10%;
  font-size: var(--font-size-small);
}
header.main > * {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: end;
  width: fit-content;
  padding: .5rem;
  border-right: 1px solid var(--color-light-grey);
  grid-row: 1;
}
header.main > *:first-child {
  justify-self: start;
  padding-left: 0;
}
header.main > *:last-child {
  padding-right: 0;
  border-right: 0;
}
.main-logo {
  width: 8rem;
  height: auto;
}

@media (max-width: 1024px) {
  header.main {
    padding: 0 1rem;
  }
  header.main > * {
    border-right: 0;
  }
  header.main > *:last-child {
    padding-left: 0;
    grid-column: 2;
  }
  header.main > *:last-child > * {
    padding-left: 0;
  }
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
