import { createRouter, createWebHistory } from 'vue-router';
import StaticPage from '@/views/StaticPage.vue';
import MovieList from '@/views/MovieList.vue';
import MovieDetail from '@/views/MovieDetail.vue';
import ScreeningsList from '@/views/ScreeningsList.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import MeView from '@/views/MeView.vue';
import apollo from '@/apollo';
import gql from 'graphql-tag';

const pages = (await apollo.query({
  query: gql`
    query RouterPages {
      Pages {
        docs {
          type
          id
          slug 
        }
      }
    }
  `,
})).data;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/me',
      name: 'me',
      component: MeView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MovieList,
    },
    {
      path: '/movies/:slug',
      name: 'movie-detail',
      component: MovieDetail,
    },
    {
      path: '/screening/:slug',
      name: 'screening-detail',
      component: MovieDetail,
    },
  ],
});

// add dynamic pages
pages.Pages.docs.forEach((page) => {
  const route = {
    path: `/${page.slug}`,
    props: {
      pageId: page.id,
    },
  };
  switch (page.type) {
    case 'screenings_list':
      route.component = ScreeningsList;
      break;

    case 'static':
    default:
      route.component = StaticPage;
      break;
  }
  router.addRoute(route);
});

export default router;
