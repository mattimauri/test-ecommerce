<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image" />
    <h2 class="product-title">{{ product.title }}</h2>
    <p class="product-price">{{ product.price }}€</p>
    <p class="product-availability">Disponibilità: {{ product.stock }}</p>

    <div class="button-row">
      <v-btn color="primary" @click="goToDetails(product.id)">+ Dettagli</v-btn>
      <v-btn color="green" @click="addToCart">Aggiungi al Carrello</v-btn>
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
    goToDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    addToCart() {
      this.$emit('addToCart', this.product);
    },
  },
};
</script>
