<template>
  <div class="home">
    <ProductsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductsList from '@/components/ProductsList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ProductsList,
  },
})
</script>
