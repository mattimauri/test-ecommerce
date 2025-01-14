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
          <ProductCard 
            :product="product" 
            @view="goToDetails"
            :deleteProduct="deleteProduct" 
            :updateProduct="updateProduct" 
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
    goToDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    async updateProduct(productId, updatedData = null) {
      try {
        // Optionally pass updated data for the product
        const response = await this.$axios.put(`/products/${productId}`, updatedData);
        console.log('Prodotto aggiornato:', response.data);

        // Update the product in the local list
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
          this.products.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Errore nell\'aggiornamento del prodotto:', error);
      }
    },
    async deleteProduct(productId) {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Product deleted successfully!');
      } else {
        alert('Error deleting product.');
      }
    },
  },
};
</script>
