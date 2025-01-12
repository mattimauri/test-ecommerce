export default {
  async fetchProducts(axios) {
    return axios.get('/products');  // Usa this.$axios
  },
  async fetchProductsByCategory(axios, category) {
    return axios.get(`/products/category/${category}`);  // Usa this.$axios
  },
  async searchProducts(axios, query) {
    return axios.get(`/products/search?q=${query}`);  // Usa this.$axios
  },
  async fetchProductDetails(axios, id) {
    return axios.get(`/products/${id}`);  // Usa this.$axios
  },
  async addProduct(axios, newProduct) {
    return axios.post('/products/add', newProduct);  // Usa this.$axios
  },
  async updateProduct(axios, id, updatedData) {
    return axios.put(`/products/${id}`, updatedData);  // Usa this.$axios
  },
  async deleteProduct(axios, id) {
    return axios.delete(`/products/${id}`);  // Usa this.$axios
  },
};
