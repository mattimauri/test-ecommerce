<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image" />
    <h2 class="product-title">{{ product.title }}</h2>
    <p class="product-price">{{ product.price }}€</p>
    <p class="product-availability">Disponibilità: {{ product.stock }}</p>

    <div class="button-row">
      <v-btn color="primary" @click="goToDetails(product.id)">
        + Dettagli
      </v-btn>

      <v-btn color="green" @click="goToEdit(product.id)">
        MODIFICA
      </v-btn>

      <v-btn color="red" @click="handleDeleteProduct(product.id)">
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
      // Navigate to the edit page for the product
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
    async handleUpdateProduct(productId) {
      try {
        await this.updateProduct(productId);
        alert('Prodotto aggiornato con successo!');
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
        alert('Errore durante l\'aggiornamento del prodotto.');
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
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
</style>
