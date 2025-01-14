<template>
  <div>
    <h1>Modifica Prodotto</h1>
    <v-form @submit.prevent="handleUpdateProduct">
      <v-text-field v-model="editableProduct.title" label="Titolo" required />
      <v-text-field v-model="editableProduct.price" label="Prezzo" type="number" required />
      <v-textarea v-model="editableProduct.description" label="Descrizione" />
      
      <!-- Save changes button -->
      <v-btn type="submit" color="primary">Salva Modifiche</v-btn>
    </v-form>
    
    <!-- Button to trigger the update action manually if you want -->
    <v-btn @click="handleUpdateProduct" color="green">Modifica</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editableProduct: { ...this.product }, // Clona il prodotto
    };
  },
  methods: {
    async handleUpdateProduct() {
      try {
        // Trigger the update method and pass the editable product data
        await this.updateProduct(this.editableProduct.id, this.editableProduct);
        alert('Prodotto aggiornato con successo!');
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
      }
    },
    
    // This is a placeholder for the actual update logic (from the parent)
    async updateProduct(productId, updatedData) {
      try {
        const response = await this.$axios.put(`/products/${productId}`, updatedData);
        console.log('Prodotto aggiornato:', response.data);
        // Optionally update local product data here (if required)
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add any custom styling here */
</style>
