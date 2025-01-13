<template>
  <div>
    <h1>{{ product.title }}</h1>
    <img :src="product.thumbnail" :alt="product.title" />
    <p>{{ product.description }}</p>
    <p>Prezzo: {{ product.price }}€</p>
    <p>Categoria: {{ product.category }}</p>
    <button @click="$router.back()">Torna indietro</button>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    try {
      const response = await $axios.get(`/products/${params.id}`);
      return { product: response.data };
    } catch (error) {
      console.error('Errore nel caricamento del prodotto:', error);
      return { product: null };
    }
  },
  data() {
    return {
      product: null,
    };
  },
};
</script>
