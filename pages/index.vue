<template>
  <div>
    <h1>Lista Prodotti</h1>
    <v-text-field
      v-model="searchQuery"
      label="Cerca prodotto"
      @input="searchProducts"
      solo
      clearable
      @click:clear="clearSearch"
    />
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
          <ProductCard 
            :product="product" 
            @view="goToDetails"
            @addToCart="addToCart"
          />
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
      searchQuery: '',
      cart: [],
    };
  },
  mounted() {
    this.fetchProductsByCategory('');
  },
  methods: {
    async fetchProductsByCategory(category) {
      this.loading = true;
      try {
        const url = category ? `/products/category/${category}` : '/products';
        const response = await this.$axios.get(url);
        this.products = response.data.products;
      } catch (error) {
        console.error('Errore nel caricamento dei prodotti:', error);
      } finally {
        this.loading = false;
      }
    },
    async searchProducts() {
      if (this.searchQuery.trim() === '') {
        this.fetchProductsByCategory('');
      } else {
        this.loading = true;
        try {
          const response = await this.$axios.get(`/products/search?q=${this.searchQuery}`);
          this.products = response.data.products;
        } catch (error) {
          console.error('Errore nella ricerca dei prodotti:', error);
        } finally {
          this.loading = false;
        }
      }
    },
    clearSearch() {
      this.searchQuery = '';
      this.fetchProductsByCategory('');
    },
    goToDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
};
</script>
