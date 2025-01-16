<template>
  <div>
    <h1>Lista Prodotti</h1>
    
    <v-text-field
      v-model="searchQuery"
      label="Cerca prodotto"
      @input="searchProducts"
      solo
      clearable
      @clear="clearSearch"
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
      searchQuery: '',  
      selectedCategory: '',  
    };
  },
  mounted() {
    this.fetchProductsByCategory(this.selectedCategory);
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
      const query = this.searchQuery || '';  
      if (query.trim() === '') {
        this.fetchProductsByCategory(this.selectedCategory);
      } else {
        this.loading = true;
        try {
          const response = await this.$axios.get(`/products/search?q=${query}`);
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
      this.fetchProductsByCategory(this.selectedCategory);
    },
    goToDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    async updateProduct(productId, updatedData = null) {
      try {
        const response = await this.$axios.put(`/products/${productId}`, updatedData);
        console.log('Prodotto aggiornato:', response.data);
        
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
          this.products.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Errore nell\'aggiornamento del prodotto:', error);
      }
    },
    async deleteProduct(productId) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Product deleted successfully!');
        } else {
          alert('Error deleting product.');
        }
      } catch (error) {
        console.error('Errore nel tentativo di cancellazione del prodotto:', error);
      }
    },
  },
};
</script>
