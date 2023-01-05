<script setup>
import { inject } from 'vue';
import { RouterView } from 'vue-router';
// import gql from 'graphql-tag';
// import { useQuery } from '@vue/apollo-composable';
import MainNavigation from '@/components/MainNavigation.vue';
import MeStatus from './components/MeStatus.vue';

const conf = inject('conf');
// const page = useQuery(gql`
//   query Pages {
//     Pages {
//       docs {
//         title
//         type
//       }
//     }
//   }
// `);
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

  <div class="main-wrapper">
    <main>
      <RouterView ref="page" :key="$route.fullPath" />
    </main>
  </div>
</template>

<style scoped>
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
  align-items: end;
  justify-content: end;
  padding: .5rem;
  font-size: var(--font-size-small);
}
.menu-section.middle {
  width: 85%;
  border-left: 1px solid var(--color-light-grey);
  border-right: 1px solid var(--color-light-grey);
}

.main-wrapper {
  display: flex;
  background-color: var(--color-theme);
  min-height: 100vh;
}
main {
  width: var(--page-max-width);
  margin: 0 auto;
  margin-top: 3rem;
  color: var(--color-white);
}
@media (min-width: 1024px) {
}
</style>
