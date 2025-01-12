<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image" />
    <h2 class="product-title">{{ product.title }}</h2>
    <p class="product-price">{{ product.price }}€</p>
    <button @click="$emit('view', product.id)" class="view-details">
      Visualizza Dettagli
    </button>
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
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.product-title {
  font-size: 1.2em;
  margin: 8px 0;
}

.product-price {
  color: #007b00;
  font-weight: bold;
}

.view-details {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 12px;
}

.view-details:hover {
  background-color: #0056b3;
}
</style>
