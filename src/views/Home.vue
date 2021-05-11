<template>
  <Loader v-if="loading"/>
  <div class="wrapper" v-else>
    <div class="season">
      <div class="season-item">
        <button 
          class="btn"
          v-for="season in getSeason" 
          :key="season"
          @click="getSeasonById(season)"
        >
          Season: {{ season }}
        </button>
      </div>
    </div>

    <Card
      :array="getSeasonsId"
    />
  </div>
</template>

<script>
import Card from "../components/Card";
import Loader from "../components/Loader";

export default {
  data: () => ({
    getItems: [],
    getSeasonsId: [],
    loading: true
  }),
  computed: {
    getSeason() {
      const season = [...new Set(this.getItems.map(i=>i.season))]
      season.splice(1,1)
      return season
    },
  },
  methods: {
    getSeasonById(season) {
      this.getSeasonsId = this.getItems
      this.getSeasonsId = this.getItems.filter(i => i.season == season)
    }
  },
  async mounted() {
    this.getItems = await this.$store.dispatch('getItems')
    this.getSeasonsId = this.getItems
    this.loading = false
  },
  components: {
    Card, Loader
  },
};
</script>

