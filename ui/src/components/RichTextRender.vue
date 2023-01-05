<!-- eslint-disable react/no-array-index-key -->
<script setup lang="jsx">
import { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import log from 'loglevel';

const props = defineProps({
  input: {
    type: Array,
    default: () => [],
  },
});

const serialize = (children) => children.map((node, i) => {
  if (Text.isText(node)) {
    log.debug(node);
    let text = <span>{node.text}</span>;

    if (node.bold) {
      text = (
        <strong key={i}>
          {text}
        </strong>
      );
    }

    if (node.code) {
      text = (
        <code key={i}>
          {text}
        </code>
      );
    }

    if (node.italic) {
      text = (
        <em key={i}>
          {text}
        </em>
      );
    }

    if (node.underline) {
      text = (
        <u key={i}>
          {text}
        </u>
      );
    }

    // Handle other leaf types here...

    return (
      <Fragment key={i}>
        {text}
      </Fragment>
    );
  }

  if (!node) {
    return null;
  }

  switch (node.type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      // eslint-disable-next-line no-case-declarations
      const CustomTag = node.type;
      return (
        <CustomTag key={i}>
          {serialize(node.children)}
        </CustomTag>
      );
    case 'quote':
      return (
        <blockquote key={i}>
          {serialize(node.children)}
        </blockquote>
      );
    case 'ul':
      return (
        <ul key={i}>
          {serialize(node.children)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {serialize(node.children)}
        </ol>
      );
    case 'li':
      return (
        <li key={i}>
          {serialize(node.children)}
        </li>
      );
    case 'link':
      return (
        <a
          href={escapeHTML(node.url)}
          key={i}
        >
          {serialize(node.children)}
        </a>
      );

    default:
      return (
        <p key={i}>
          {serialize(node.children)}
        </p>
      );
  }
});

const render = () => {
  if (!props.input) return '';
  return serialize(props.input);
};
</script>

<template>
  <render />
</template>
