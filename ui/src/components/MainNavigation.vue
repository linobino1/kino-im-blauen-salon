<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/movies">Movies</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  justify-self: end;
}
nav a.router-link-exact-active {
  color: var(--color-black);
}
nav a.router-link-exact-active:hover {
  color: inherit;
}
nav a {
  display: inline-block;
  padding: .5rem 1rem;
  color: var(--color-font-light);
  text-transform: uppercase;
}
nav a:hover {
  color: var(--color-theme-contrast);
}
</style>
