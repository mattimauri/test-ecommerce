<template>
  <div>
    <h1>{{ product.title }}</h1>
    <img :src="product.thumbnail" :alt="product.title" />
    <p>{{ product.description }}</p>
    <p>{{ product.price }}€</p>
    <p>availability</p><p>{{ product.stock }}€</p>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const response = await $axios.get(`/products/${params.id}`);
    return {
      product: response.data,
    };
  },
};
</script>
