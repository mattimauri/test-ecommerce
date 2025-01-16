<template>
  <div>
    <h1>Il Mio Carrello</h1>
    <v-container>
      <v-row v-if="cart.length === 0">
        <p>Il carrello è vuoto.</p>
      </v-row>
      <v-row v-for="item in cart" :key="item.id">
        <v-col cols="12" sm="6" md="4">
          <div class="cart-item">
            <img :src="item.thumbnail" :alt="item.title" class="cart-image" />
            <div class="cart-details">
              <h2>{{ item.title }}</h2>
              <p>{{ item.price }}€ x {{ item.quantity }}</p>
              <v-btn small color="red" @click="removeFromCart(item.id)">Rimuovi</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" @click="checkout" :disabled="cart.length === 0">
      Procedi al Checkout
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
  methods: {
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    checkout() {
      alert('Checkout completato!');
      this.cart = [];
      localStorage.removeItem('cart');
    },
  },
  watch: {
    cart: {
      handler(newValue) {
        localStorage.setItem('cart', JSON.stringify(newValue));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.cart-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 16px;
}

.cart-details {
  flex: 1;
}
</style>
