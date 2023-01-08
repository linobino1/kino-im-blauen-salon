<script setup>
import { inject } from 'vue';
import { RouterView } from 'vue-router';
import MainNavigation from '@/components/MainNavigation.vue';
import MeStatus from './components/MeStatus.vue';

const conf = inject('conf');
</script>

<template>
  <header>
    <div class="header-section menu">
      <div class="menu-section start">
        <img class="header-logo" :src="conf.Site.favicon.url" alt="logo" />
      </div>
      <div class="menu-section middle">
        <MainNavigation />
      </div>
      <div class="menu-section end">
        <MeStatus />
      </div>
    </div>
  </header>

  <main>
    <RouterView ref="page" :key="$route.fullPath" />
  </main>
</template>

<style>
header {
  display: flex;
  flex-direction: column;
}
.header-section {
  display: flex;
  flex-direction: row;
}
.header-section.menu {
  display: flex;
  padding-left: 7vw;
  padding-right: 7vw;
}
.header-logo {
  width: 8rem;
  height: auto;
}

.menu-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  padding: .5rem;
  font-size: var(--font-size-small);
}
.menu-section.middle {
  width: 85%;
  border-left: 1px solid var(--color-light-grey);
  border-right: 1px solid var(--color-light-grey);
}

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
