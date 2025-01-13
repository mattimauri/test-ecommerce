<template>
  <div>
    <h1>Lista Prodotti</h1>
    <FilterBar @filter="fetchProductsByCategory" />
    <div v-if="loading">Caricamento...</div>
    <v-container>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FilterBar from '~/components/FilterBar';
import ProductCard from '~/components/ProductCard';

export default {
  components: { FilterBar, ProductCard },
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchProductsByCategory('');
  },
  methods: {
    async fetchProductsByCategory(category) {
      this.loading = true;
      try {
        const url = category
          ? `/products/category/${category}`
          : '/products'; 
        const response = await this.$axios.get(url);
        this.products = response.data.products;
      } catch (error) {
        console.error('Errore nel caricamento dei prodotti:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
