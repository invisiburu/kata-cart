<template>
  <div id="nav">
    <router-link to="/">Shop</router-link> |
    <router-link :to="{ name: 'Checkout' }">Checkout</router-link> |
    <router-link :to="{ name: 'Marketing' }">Marketing</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  padding: 3rem;
  max-width: 1200px;
  margin: auto;
}

#nav {
  text-align: center;
  margin-bottom: 2rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
