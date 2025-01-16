export const state = () => ({
  products: [],
  product: null,
  loading: false,
});

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};

export const actions = {
  async fetchProducts({ commit, rootState }) {
    commit('SET_LOADING', true);
    try {
      const response = await rootState.$axios.get('/products');  
      commit('SET_PRODUCTS', response.data.products);
    } catch (error) {
      console.error('Errore nel caricamento dei prodotti:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchProductDetails({ commit, rootState }, id) {
    commit('SET_LOADING', true);
    try {
      const response = await rootState.$axios.get(`/products/${id}`);
      commit('SET_PRODUCT', response.data);
    } catch (error) {
      console.error('Errore nel caricamento del prodotto:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};
