<template>
<Loader v-if="loading"/>
  <div class="wrapper" v-else>
    <div class="ep-body" v-for="ep in getEpisodeInfo" :key="ep.episode_id">
      <h3>Title: {{ep.title}}</h3>
      <p class="episode-date"><strong>Date:</strong> {{ep.air_date}} </p>
      <h3 class="episode-persons">Characters</h3>
      <ul class="all-persons">
        <li
          @click="$router.push('/person/'+char.char_id)"
          class="person-info" 
          v-for="char in currentPerson"
          :key="char.char_id"
        >
          <div class="person-image">
            <img :src="char.img" :alt="char.portrayed">
          </div>
          <div class="person-information">
            <div class="person-name">
              <h3>{{char.name}}</h3>
              <span>({{char.nickname}})</span>
            </div>
            <div >
              <p class="person-birthday"><strong>Birthday:</strong> {{char.birthday}}</p>
              <h4 class="person-occupation-title">Occupation</h4>
              <p class="person-occupation" v-for="occupation in char.occupation" :key="occupation">{{occupation}}</p>
              <p class="person-status"><strong>Status:</strong> {{char.status}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader";

export default {
  data: () => ({
    getItems: [],
    getCharacters: [],
    currentPerson: [],
    loading: true
  }),
  async mounted() {
    this.getItems = await this.$store.dispatch('getItems')
    this.getCharacters = await this.$store.dispatch('getCharacters')
    this.getCharactersInfo
    this.loading = false
  },
  computed: {
    getEpisodeInfo() {
      return this.getItems.filter(i => i.episode_id === +this.$route.params.id)
    },
    getCharactersInfo() {
      const characterInEspisode = this.getEpisodeInfo[0].characters
      for(let idx = 0; idx < characterInEspisode.length; idx++){
        let char = characterInEspisode[idx]
        let pers = this.getCharacters.filter(i => i.name === char || i.nickname === char || i.nickname === char.split(" ")[0])
        this.currentPerson.push(pers[0])
      }
      return this.currentPerson
    }
  },
  components: {
    Loader
  }
};
</script>
