<template>
  <div class="home">
    <div class="home__section">
      <h3 class="home__section-title">Products</h3>
      <ProductsList />
    </div>

    <div class="home__section">
      <h3 class="home__section-title">Cart</h3>
      <CartWidget />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductsList from '@/components/ProductsList.vue'
import CartWidget from '@/components/CartWidget.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ProductsList,
    CartWidget,
  },
})
</script>

<style scoped>
.home {
  display: grid;
  grid: auto / auto-flow 1fr;
  gap: 3.2rem;
}

.home__section {
}
</style>
