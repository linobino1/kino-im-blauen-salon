import log from 'loglevel';
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { useFavicon } from '@vueuse/core';
// eslint-disable-next-line no-unused-vars
import apollo from '@/apollo';
import gql from 'graphql-tag';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const conf = (await apollo.query({
  query: gql`
    query Site {
      Site {
        favicon {
          filename
          url
        }
        title
      }
    }
  `,
})).data;
log.debug(conf);

const icon = useFavicon();
icon.value = conf.Site.favicon?.url;

const app = createApp(App);
const head = createHead({
  title: conf.Site.title,
});

app.use(head);
app.use(createPinia());
app.use(router);

app.mount('#app');
