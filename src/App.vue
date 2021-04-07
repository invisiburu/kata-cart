<template>
  <nav class="nav">
    <router-link class="nav__link" to="/">Shop</router-link>
    |
    <router-link class="nav__link" :to="{ name: 'Marketing' }">
      Marketing
    </router-link>
  </nav>

  <main class="main">
    <router-view />
  </main>

  <footer class="footer">
    <span class="footer__text">
      See the
      <a
        class="footer__link"
        href="https://github.com/invisiburu"
        target="_blank"
        rel="noopener noreferrer"
      >
        @invisiburu</a
      >
    </span>

    <span class="footer__text">
      or the
      <a
        class="footer__link"
        href="https://github.com/invisiburu/kata-cart"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </span>
  </footer>
</template>

<style lang="scss">
#app {
  padding: 3rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main {
  flex: 1;
}

.nav {
  text-align: center;
  margin-bottom: 2rem;
}

.nav__link {
  font-weight: bold;
  color: var(--clr__darkDarkBlue);

  &.router-link-exact-active {
    color: var(--clr__green);
  }
}

.footer {
  margin-top: auto;
  color: var(--clr__gray);
  text-align: center;
}

.footer__link {
  color: var(--clr__green);
}
</style>
