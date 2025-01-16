import api from '~/services/api';

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
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await api.fetchProducts(this.$axios); 
      commit('SET_PRODUCTS', response.data.products);
    } catch (error) {
      console.error('Errore nel caricamento dei prodotti:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async fetchProductDetails({ commit }, { id }) {
    commit('SET_LOADING', true);
    try {
      const response = await api.fetchProductDetails(this.$axios, id); 
      commit('SET_PRODUCT', response.data);
    } catch (error) {
      console.error('Errore nel caricamento del prodotto:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};
