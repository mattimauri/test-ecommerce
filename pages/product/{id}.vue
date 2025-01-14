<template>
  <div>
    <h1>Modifica Prodotto</h1>
    <v-form @submit.prevent="handleUpdateProduct">
      <v-text-field v-model="editableProduct.title" label="Titolo" required />
      <v-text-field v-model="editableProduct.price" label="Prezzo" type="number" required />
      <v-textarea v-model="editableProduct.description" label="Descrizione" />
      <v-btn type="submit" color="primary">Salva Modifiche</v-btn>
    </v-form>
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
      await this.updateProduct(this.editableProduct.id, this.editableProduct);
    },
  },
};
</script>
