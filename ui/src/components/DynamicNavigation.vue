<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});

// query navigation of given type including one layer of submenus
const query = gql`
  query getNavigation($type: Navigation_type_Input) {
    Navigations(where: {type: { equals: $type } }) {
      docs {
        items {
          type
          name
          page {
            slug
          }
          url
          icon {
            url
          }
          submenu {
            items {
              type
              name
              page {
                slug
              }
              url
              icon {
                url
              }
            }
          }
        }
      }
    }
  }
`;
const variables = {
  type: props.type,
};
const { result } = useQuery(query, variables);
const nav = computed(() => result?.value?.Navigations?.docs[0]);
</script>

<template>
  <nav v-if="nav" :class="props.type">
    <template v-for="item in nav.items" :key="item">
      <RouterLink
        v-if="item.type === 'internal'"
        :to="`/${item.page.slug}`"
      >
        <img
          v-if="item.icon"
          :src="item.icon.url"
          :alt="`${item.name} icon`"
        />
        <span v-else>{{ item.name }}</span>
      </RouterLink>

      <a
        v-if="item.type === 'external'"
        :key="item"
        :href="item.url"
        :aria-label="`link to ${item.name}`"
        target="_blank"
        rel="noopener norefferer"
      >
        <img
          v-if="item.icon"
          :src="item.icon.url"
          :alt="`${item.name} icon`"
        />
        <span v-else>{{ item.name }}</span>
      </a>
    </template>
  </nav>
</template>

<style>
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
</style>
