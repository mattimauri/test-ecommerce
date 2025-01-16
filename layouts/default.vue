<template>
  <v-app dark>
    <!-- Toolbar -->
    <v-app-bar fixed app>
      <v-btn icon @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <!-- Cart Button -->
      <v-spacer></v-spacer>
      <v-btn icon @click="goToCart">
        <v-badge
          :content="cartCount"
          color="red"
          overlap
        >
          <template v-slot:badge>
            <v-icon>mdi-cart</v-icon>
          </template>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'SimpleLayout',
  data() {
    return {
      fixed: false,
      title: 'Test e-commerce',
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
  },
  computed: {
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  watch: {
    cart: {
      handler() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      },
      deep: true,
    },
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.go(-1);
    },
    goToCart() {
      this.$router.push('/cart');
    },
  },
};
</script>
