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
    }
  },
  methods: {
    goHome() {
      this.$router.push('/'); 
    },
    goBack() {
      this.$router.go(-1); 
    }
  }
}
</script>
