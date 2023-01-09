<script setup>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import PostsListItem from '../components/PostsListItem.vue';
import HeaderTitle from '../components/HeaderTitle.vue';
import MainContent from '../components/MainContent.vue';
import HeaderImage from '../components/HeaderImage.vue';

const props = defineProps({
  pageId: {
    default: undefined,
  },
});

const query = gql`
  query PostsList($pageId: String!) {
    Page(id: $pageId) {
      title
      header {
        url
        filename
      }
    }
    Posts {
      docs {
        title
        slug
        date
        content
        header {
          url
        }
        link
      }
    }
  }
`;
const variables = {
  pageId: props.pageId,
};
const { result, loading, error } = useQuery(query, variables);

const page = computed(() => result?.value?.Page);
const posts = computed(() => result?.value?.Posts?.docs);
</script>

<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else style="display: contents;">
    <HeaderImage :image="page.header" />
    <HeaderTitle :title="page.title" />
    <MainContent>
      <template v-if="posts.length">
        <div
          v-for="post in posts"
          :key="post"
          class="posts-list"
        >
          <PostsListItem :post="post" />
          <hr />
        </div>
      </template>
      <div v-else class="posts-empty">No posts.</div>
    </MainContent>
  </div>
</template>

<style>
.posts-list {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
.posts-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
}
</style>
