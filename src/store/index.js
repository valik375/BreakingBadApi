import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async getItems() {
      const res = await fetch("https://www.breakingbadapi.com/api/episodes");
      return await res.json();
    },
    async getCharacters() {
      const res = await fetch("https://breakingbadapi.com/api/characters");
      return await res.json();
    },
    async getQuotes() {
      const res = await fetch("https://breakingbadapi.com/api/quotes");
      return await res.json();
    },
    async getDeaths() {
      const res = await fetch("https://breakingbadapi.com/api/deaths");
      return await res.json();
    }
  },
  modules: {
  }
})
