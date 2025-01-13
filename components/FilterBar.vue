<template>
  <div>
    <v-combobox
      label="Seleziona una Categoria"
      :items="categories"
      v-model="selectedCategory"
      @change="filterByCategory"
      clearable
    ></v-combobox>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      selectedCategory: 'Tutte', 
      categories: ['Tutte', 'smartphones', 'laptops', 'fragrances', 'skincare'], 
    };
  },
  watch: {
    selectedCategory(newCategory) {
      const category = newCategory === 'Tutte' ? '' : newCategory;
      this.$emit('filter', category); 
    },
  },
};
</script>
