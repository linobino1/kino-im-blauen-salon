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
