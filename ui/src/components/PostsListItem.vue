<script setup>
import format from 'date-fns/format';
import { de } from 'date-fns/esm/locale';
import RichTextRender from '@/components/RichTextRender.vue';

const props = defineProps({
  post: {
    default: undefined,
  },
});

const dateDT = new Date(props.post.date);
const date = format(dateDT, 'PPP', { locale: de });
</script>

<template>
  <div class="post-list-item">
    <div class="date">{{ date }}</div>
    <h2 class="title">{{ post.title }}</h2>
    <div class="preview">
      <div class="img-wrapper">
        <RouterLink
          v-if="post.link"
          :to="post.link"
          class="link-theme"
        >
          <img
            :src="post.header?.url"
            alt="post header image"
          />
        </RouterLink>
        <template v-else>
          <img
            :src="post.header?.url"
            alt="post header image"
          />
        </template>
      </div>
      <RichTextRender :input="post.content" class="content" />
    </div>
  </div>
</template>

<style>
.post-list-item {
  padding-top: 2rem;
}
.post-list-item .date {
  color: var(--color-theme-contrast-light);
  font-size: var(--font-size-small);
}
.post-list-item .title {
  font-size: var(--font-size-xxx-big);
  line-height: var(--line-height-normal);
  font-weight: var(--font-weight-light);
  letter-spacing: var(--letter-spacing-x-big);
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 1rem;
}
.post-list-item .preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.2rem;
  width: 100%;
  padding: 1rem 0;
}
.post-list-item .preview .img-wrapper {
  max-height: 18rem;
  width: 100%;
}
.post-list-item .preview .img-wrapper img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.post-list-item .preview .content > *:first-child {
  margin-top: 0;
}
@media (max-width: 768px) {
  .post-list-item .preview {
    grid-template-columns: 1fr;
    row-gap: 1.2rem;
  }
}
</style>
