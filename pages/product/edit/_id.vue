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
      editableProduct: null, 
    };
  },
  async asyncData({ params, $axios }) {
    try {
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
        const updatedProduct = {
          title: this.editableProduct.title,
          price: this.editableProduct.price,
          description: this.editableProduct.description,
          stock: this.editableProduct.stock,
        };

        const response = await this.$axios.put(`https://dummyjson.com/products/${this.editableProduct.id}`, updatedProduct);

        alert('Prodotto aggiornato con successo!');
        this.$router.push('/'); 
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
        alert('Errore durante l\'aggiornamento del prodotto.');
      }
    },
  },
};
</script>

<style scoped>
/* Aggiungi uno stile semplice, se necessario */
</style>
