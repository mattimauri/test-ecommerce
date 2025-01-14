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

      <v-btn color="green" @click="handleUpdateProduct(product.id)">
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
    async handleDeleteProduct(productId) {
      const confirmDelete = confirm('Sei sicuro di voler eliminare questo prodotto?');
      if (confirmDelete) {
        await this.deleteProduct(productId);
      }
    },
    async handleUpdateProduct(productId) {
      await this.updateProduct(productId);
    },
  },
};
</script>
