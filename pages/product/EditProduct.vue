<template>
  <div>
    <h1>Modifica Prodotto</h1>
    <v-form @submit.prevent="handleUpdateProduct">
      <v-text-field v-model="editableProduct.title" label="Titolo" required />
      <v-text-field v-model="editableProduct.price" label="Prezzo (€)" type="number" required />
      <v-textarea v-model="editableProduct.description" label="Descrizione" required />
      <v-text-field v-model="editableProduct.stock" label="Disponibilità" type="number" required />

      <v-btn type="submit" color="primary">Salva Modifiche</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableProduct: null, // Holds the product to edit
    };
  },
  async asyncData({ params, $axios }) {
    try {
      // Fetch the product data using the route param (product ID)
      const response = await $axios.get(`/products/${params.id}`);
      return {
        editableProduct: response.data,
      };
    } catch (error) {
      console.error('Errore durante il caricamento del prodotto:', error);
      return { editableProduct: null };
    }
  },
  methods: {
    async handleUpdateProduct() {
      try {
        const response = await this.$axios.put(`/products/${this.editableProduct.id}`, this.editableProduct);
        alert('Prodotto aggiornato con successo!');
        this.$router.push('/'); // Redirect to the product list after updating
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
        alert('Errore durante l\'aggiornamento del prodotto.');
      }
    },
  },
};
</script>
