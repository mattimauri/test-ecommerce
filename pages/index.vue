<template>
  <div>
    <h1>Lista Prodotti</h1>
    <FilterBar @filter="filterByCategory" />
    <div v-if="loading">Caricamento...</div>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="4" md="4" lg="4">
        <ProductCard
          :product="product"
          @view="goToDetails"
        />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import FilterBar from '~/components/FilterBar';
import ProductCard from '~/components/ProductCard';

export default {
  components: { FilterBar, ProductCard },
  computed: {
    ...mapState('products', ['products', 'loading']),
  },
  async fetch({ store }) {
    await store.dispatch('products/fetchProducts', { axios: this.$axios });
  },
  methods: {
    filterByCategory(category) {
      this.$store.dispatch('products/fetchProductsByCategory', {
        axios: this.$axios,
        category,
      });
    },
    goToDetails(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
