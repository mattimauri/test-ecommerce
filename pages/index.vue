<template>
  <div>
    <v-app dark>
      <!-- Toolbar -->
      <v-app-bar fixed app>
        <v-btn icon @click="goHome">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>Lista Prodotti</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Cart Button -->
        <v-btn icon @click="goToCart">
          <v-badge
            :content="cartCount"
            color="red"
            overlap
            v-if="cartCount > 0"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container>
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
      </v-main>
    </v-app>
  </div>
</template>

<script>
import FilterBar from '~/components/FilterBar';
import ProductCard from '~/components/ProductCard';
import { EventBus } from '~/utils/eventBus.js';

export default {
  components: { FilterBar, ProductCard },
  data() {
    return {
      products: [],
      loading: false,
      searchQuery: '',
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
  },
  computed: {
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  mounted() {
    this.fetchProductsByCategory('');
    EventBus.$on('cart-updated', (updatedCart) => {
      this.cart = updatedCart;
    });
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
    goHome() {
      this.$router.push('/');
    },
    goToCart() {
      this.$router.push('/cart');
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
      EventBus.$emit('cart-updated', this.cart);
    },
  },
  watch: {
    cart(newCart) {
      this.cartCount; 
      localStorage.setItem('cart', JSON.stringify(newCart)); 
    },
  },
  beforeDestroy() {
    EventBus.$off('cart-updated');
  },
};

</script>
