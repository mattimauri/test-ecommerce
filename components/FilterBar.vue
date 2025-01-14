<template>
  <div>
    <v-combobox
      label="Seleziona una Categoria"
      :items="categories"
      v-model="selectedCategory"
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
      categories: [
        'Tutte',
        'beauty',
        'fragrances',
        'furniture',
        'groceries',
        'home-decoration',
        'kitchen-accessories',
        'laptops',
        'mens-shirts',
        'mens-shoes',
        'mens-watches',
        'mobile-accessories',
        'motorcycle',
        'skin-care',
        'smartphones',
        'sports-accessories',
        'sunglasses',
        'tablets',
        'tops',
        'vehicle',
        'womens-bags',
        'womens-dresses',
        'womens-jewellery',
        'womens-shoes',
        'womens-watches',
      ], 
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
