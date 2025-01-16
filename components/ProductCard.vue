<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image" />
    <div class="product-info">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-price">{{ product.price }}€</p>
      <p class="product-availability">Disponibilità: {{ product.stock }}</p>
    </div>

    <div class="button-row">
      <v-btn 
        color="primary" 
        @click="goToDetails(product.id)"
        block
        class="button-mobile"
      >
        + Dettagli
      </v-btn>

      <v-btn 
        color="green" 
        @click="goToEdit(product.id)"
        block
        class="button-mobile"
      >
        MODIFICA
      </v-btn>

      <v-btn 
        color="red" 
        @click="handleDeleteProduct(product.id)"
        block
        class="button-mobile"
      >
        Elimina
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
    deleteProduct: {
      type: Function,
      required: true,
    },
    updateProduct: {
      type: Function,
      required: true,
    },
  },
  methods: {
    goToDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    goToEdit(productId) {
      this.$router.push(`/product/edit/${productId}`);
    },
    async handleDeleteProduct(productId) {
      const confirmDelete = confirm('Sei sicuro di voler eliminare questo prodotto?');
      if (confirmDelete) {
        try {
          await this.deleteProduct(productId);
          alert('Prodotto eliminato con successo!');
        } catch (error) {
          console.error('Errore durante l\'eliminazione del prodotto:', error);
          alert('Errore durante l\'eliminazione del prodotto.');
        }
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  height: 100%;  /* Ensures all cards have equal height */
  transition: all 0.3s ease;
}

.product-info {
  flex-grow: 1;  /* Allows the info section to grow and take the remaining space */
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.product-title,
.product-price,
.product-availability {
  margin: 8px 0;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.button-mobile {
  width: 100%;
}

@media (min-width: 600px) {
  .button-row {
    display: flex;
    flex-direction: row;
  }

  .button-mobile {
    width: auto;
  }
}
</style>
