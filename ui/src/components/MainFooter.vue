<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import RichTextRender from './RichTextRender.vue';

const query = gql`
  query MainFooter {
    Navigations(where: {type: { equals: footer } }) {
      docs {
        items {
          page {
            id
            slug
            title
          }
        }
        adress
        socialLinks {
          item {
            name
            url
            icon {
              url
            }
          }
        }
      }
    }
  }
`;
const { result } = useQuery(query);
const footer = computed(() => result?.value?.Navigations?.docs[0]);
</script>

<template>
  <footer v-if="footer">
    <div class="footer-adress">
      <RichTextRender :input="footer.adress" />
    </div>
    <div class="footer-center">
      <div class="footer-social">
        <a
          v-for="{ item } in footer.socialLinks"
          :key="item"
          :href="item.url"
          :aria-label="`link to ${item.name}`"
          target="_blank"
          rel="noopener norefferer"
        >
          <img :src="item.icon.url" :alt="`${item.name} icon`" />
        </a>
      </div>
      <nav>
        <RouterLink
          v-for="{ page } in footer.items"
          :key="page"
          :to="`/${page.slug}`"
        >
          {{ page.title }}
        </RouterLink>
      </nav>
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

.footer-adress * {
  margin-top: 0;
  margin-bottom: 0;
  line-height: inherit;
}

.footer-social a {
  display: block;
  height: 1.5em;
  box-sizing: content-box;
  padding: .2em .7em;
  position: relative;
}
.footer-social a img {
  height: 100%;
  width: auto;
}
.footer-social a::before {
  content: ' ';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: var(--color-theme);
  mix-blend-mode: color;
  opacity: 0;
  transition: opacity .4s;
}
.footer-social a:hover::before {
  opacity: 1;
}
nav a {
  display: inline-block;
  color: inherit;
}
nav a:hover {
  color: var(--color-theme);
}
.footer-newsletter {
  display: flex;
  justify-content: end;
}
</style>
