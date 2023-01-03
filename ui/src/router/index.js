import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '@/views/MovieList.vue';
import MovieDetail from '@/views/MovieDetail.vue';
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
          title
          slug 
        }
      }
    }
  `,
})).data;

// const componentMap = {
//   static: undefined,
//   screenings: ScreeningsList,
// };

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
    // {
    //   path: '/:key',
    //   name: 'page',
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/movies',
      name: 'movies',
      component: MovieList,
    },
    {
      path: '/movies/:id',
      name: 'movie-detail',
      component: MovieDetail,
    },
  ],
});

export default router;
