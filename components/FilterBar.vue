<template>
    <div>
      <!-- Filtro per categoria -->
      <label for="categories">Seleziona una Categoria:</label>
      <select id="categories" @change="$emit('filter', $event.target.value)">
        <option value="">Tutte</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <!-- Altre categorie -->
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterBar', 
  };
  </script>
  