import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    cart: [],
    loading: false,
    searchQuery: ''
  },
  getters: {
    // Total number of unique items or cumulative quantity in cart
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    }
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    DECREASE_CART_ITEM(state, productId) {
      const existingItem = state.cart.find(item => item.id === productId)
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
          state.cart = state.cart.filter(item => item.id !== productId)
        }
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        commit('SET_PRODUCTS', data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    decreaseCartItem({ commit }, productId) {
      commit('DECREASE_CART_ITEM', productId)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  }
})
