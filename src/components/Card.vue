<template>
  <ul class="series-items">
    <li 
      class="item" 
      v-for="item in array" 
      :key="item.episode_id" 
      @click="$router.push('/episode/'+item.episode_id)"
    >
      <h3 class="episode-title">{{ item.title }}</h3>
      <p class="episode-date"><strong>Date:</strong> {{ item.air_date }}</p>
      <h3 class="episode-persons">Characters</h3>
      <div class="episode-characters">
        <p 
          v-for="person in item.characters" 
          :key="person"
        >
          {{ person }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["array"],
  name: "Card",
};
</script>
