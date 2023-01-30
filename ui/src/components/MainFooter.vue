<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import DynamicNavigation from './DynamicNavigation.vue';
import RichTextRender from './RichTextRender.vue';

const query = gql`
  query MainFooter {
    Site {
      address
    }
  }
`;
const { result } = useQuery(query);
</script>

<template>
  <footer>
    <RichTextRender :input="result?.Site?.address" class="address" />
    <DynamicNavigation type="social" class="footer" />
    <DynamicNavigation type="footer" />
    <a class="newsletter">newsletter</a>
  </footer>
</template>

<style>
footer {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 2% 10%;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  row-gap: 1rem;
}

/** Grid Layout ************************************************************************/
footer .address {
  grid-column: 1;
  grid-row: 1 / span 2;
}
footer .address * {
  margin-top: 0;
  margin-bottom: 0;
  line-height: inherit;
}

footer nav.social.footer {
  grid-column: 2;
  grid-row: 1;
  align-self: flex-start;
}
footer nav.footer {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
}
footer nav {
  justify-self: center;
}

footer .newsletter {
  grid-column: 3;
  grid-row: 1;
  display: flex;
  justify-content: end;
}

/** Navigations ************************************************************************/
footer nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 1em;
}
footer nav.footer a {
  color: inherit;
}
footer nav.footer a:hover {
  color: var(--color-theme);
}

/** Mobile Grid Layout *****************************************************************/
@media (max-width: 768px) {
  footer {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  footer > * {
    grid-column: 1 !important;
    justify-self: center;
  }
  footer .newsletter {
    grid-row: 1;
  }
  footer nav.social.footer {
    grid-row: 2;
  }
  footer .address {
    grid-row: 3;
    text-align: center;
  }
  footer nav.footer {
    grid-row: 4;
  }
}
</style>
