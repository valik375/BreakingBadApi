<template>
  <Loader v-if="loading" />
  <div class="wrapper" v-else>
    <div class="person-container" v-for="person in getPerson" :key="person.char_id">
      <div class="person-photp">
        <img :src="person.img" :alt="person.portrayed">
      </div>
      <div class="about-person">
        <div class="about-wrapper">
          <h1>{{person.name}}</h1>
          <p>({{person.nickname}})</p>
          <p class="about-birthday">Birthday: <span> {{person.birthday}}</span></p>
          <p class="about-occupation">Occupation:</p>
          <p v-for="occupation in person.occupation" :key="occupation">{{occupation}}</p>
          <div class="btn-group" v-if="currentQuotes.length || currentDeaths.length">
            <a v-if="currentQuotes.length" href="#phrases" class="btn">Phrases</a>
            <a v-if="currentDeaths.length" href="#deaths" class="btn">Deaths</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentQuotes.length" class="character-phrases" id="phrases">
      <h3>Character phrases</h3>
      <p 
        v-for="(quotes, index) in currentQuotes" 
        :key="quotes.quote_id"
      >
        {{index + 1}}) {{quotes.quote}}
      </p>
    </div>

    <div v-if="currentDeaths.length" class="character-death" id="deaths">
      <h3>Responsible for death</h3>
      <ul class="death-wrapper">
        <li 
          v-for="death in currentDeaths" 
          :key="death.death_id"
          class="death-item"
        >
          <p>Cause: {{death.cause}}</p>
          <p>Death: {{death.death}}</p>
          <p>Episode: {{death.episode}}</p>
          <p>Season: {{death.season}}</p>
          <p>Last words: {{death.last_words}}</p>
          <p>Number of deaths: {{death.number_of_deaths}}</p>
          <p>Responsible for the death: {{death.responsible}}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Loader from "../components/Loader";

export default {
  data: () => ({
    getCharacter: [],
    getQuotes: [],
    getDeaths: [],
    currentQuotes: [],
    currentDeaths: [],
    loading: true
  }),
  async mounted() {
    this.getCharacter = await this.$store.dispatch('getCharacters')
    this.getQuotes = await this.$store.dispatch('getQuotes')
    this.getDeaths = await this.$store.dispatch('getDeaths')
    this.getCharacterQuotes
    this.getCharacterDeaths
    this.loading = false
  },
  computed: {
    getPerson() {
      return this.getCharacter.filter(i => i.char_id === +this.$route.params.id)
    },
    getCharacterDeaths() {
      let personName = this.getPerson[0].name
      let personNick = this.getPerson[0].nickname
      const personDeaths = this.getDeaths.filter(i => i.responsible === personName ||  i.responsible === personNick || i.responsible === personName.split(" ")[0])
      for(let idx = 0; idx < personDeaths.length; idx++){
        this.currentDeaths.push(personDeaths[idx])
      }
      return this.currentDeaths
    },
    getCharacterQuotes() {
      let personName = this.getPerson[0].name
      let personNick = this.getPerson[0].nickname
      const personQuotes = this.getQuotes.filter(i => i.author === personName || i.author === personNick || i.author === personName.split(" ")[0])
      for(let idx = 0; idx < personQuotes.length; idx++){
        this.currentQuotes.push(personQuotes[idx])
      }
      return this.currentQuotes
    }
  },
  components: {
    Loader
  }
};
</script>
