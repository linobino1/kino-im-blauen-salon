<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import DynamicNavigation from './DynamicNavigation.vue';
import RichTextRender from './RichTextRender.vue';

const query = gql`
  query MainFooter {
    Site {
      adress
    }
  }
`;
const { result } = useQuery(query);
</script>

<template>
  <footer>
    <div class="footer-adress">
      <RichTextRender :input="result?.Site?.adress" />
    </div>
    <div class="footer-center">
      <DynamicNavigation type="social" />
      <DynamicNavigation type="footer" />
    </div>
    <div class="footer-newsletter">
      <a>newsletter</a>
    </div>
  </footer>
</template>

<style>
footer {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 2% 10%;
  display: grid;
  grid-template-columns: 25% 50% 25%;
}

.footer-adress * {
  margin-top: 0;
  margin-bottom: 0;
  line-height: inherit;
}

.footer-center {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer-center > * {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 1em;
}

nav.social a {
  display: block;
  height: 1.5em;
  box-sizing: content-box;
  padding: .2em .7em;
  position: relative;
}
nav.social a img {
  height: 100%;
  width: auto;
}
nav.social a::before {
  content: ' ';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: var(--color-theme);
  mix-blend-mode: darken;
  opacity: 0;
  transition: opacity .4s;
}
nav.social a:hover::before {
  opacity: 1;
}

nav.footer a {
  display: inline-block;
  color: inherit;
}
nav.footer a:hover {
  color: var(--color-theme);
}

.footer-newsletter {
  display: flex;
  justify-content: end;
}
</style>
