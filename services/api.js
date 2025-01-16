export default {
  async fetchProducts(axios) {
    return axios.get('/products');  
  },
  async fetchProductsByCategory(axios, category) {
    return axios.get(`/products/category/${category}`);  
  },
  async searchProducts(axios, query) {
    return axios.get(`/products/search?q=${query}`);  
  },
  async fetchProductDetails(axios, id) {
    return axios.get(`/products/${id}`);  
  },
  async addProduct(axios, newProduct) {
    return axios.post('/products/add', newProduct);  
  },
  async updateProduct(axios, id, updatedData) {
    return axios.put(`/products/${id}`, updatedData);  
  },
  async deleteProduct(axios, id) {
    return axios.delete(`/products/${id}`);  
  },
};
