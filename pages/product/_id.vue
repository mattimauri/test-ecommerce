<template>
    <div>
      <h1>{{ product.title }}</h1>
      <img :src="product.thumbnail" :alt="product.title" />
      <p>{{ product.description }}</p>
      <p>Prezzo: {{ product.price }}€</p>
      <button @click="addToCart(product)">Aggiungi al Carrello</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null,
      };
    },
    async asyncData({ params, $axios }) {
      const response = await $axios.get(`/products/${params.id}`);
      return { product: response.data };
    },
    methods: {
      addToCart(product) {
        this.$store.commit('cart/add', product);
      },
    },
  };
  </script>
  