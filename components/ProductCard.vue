<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image" />
    <h2 class="product-title">{{ product.title }}</h2>
    <p class="product-price">{{ product.price }}€</p>
    <p class="product-availability">Disponibilità: {{ product.stock }}</p>

    <div class="button-row">
      <v-btn color="primary" @click="goToDetails">+ Dettagli</v-btn>
      <v-btn color="green" @click="addToCart">Aggiungi al Carrello</v-btn>
      <v-btn color="blue" @click="goToEdit">Modifica</v-btn>
      <v-btn color="red" @click="deleteProduct">Elimina</v-btn>
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
  },
  methods: {
    goToDetails() {
      this.$emit('view', this.product.id);
    },
    goToEdit() {
      this.$emit('edit', this.product.id);
    },
    deleteProduct() {
      this.$emit('delete', this.product.id);
    },
    addToCart() {
      this.$emit('addToCart', this.product);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
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
