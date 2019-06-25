<template>
    <div>
        <div class="bar">
            <input type="text" v-model="searchString" placeholder="Введите имя коробля"/>
        </div>
        Всего Короблей: {{starshipsCount}}<br><br>
        <button :disabled="pageNumber === 0" @click="prevPage">prev</button>
        <button :disabled="pageNumber >= pageCount -1" @click="nextPage"> next</button>
        <ul>
            <li v-if="starships.length == 0">Loading</li>
            <li v-for="starship in filteredStarships">
                <router-link :to="starship.url">{{starship.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      pageNumber: 0,
      searchString: this.query,
      starship: [],
      starships: [],
      starshipsCount: 0,
    }
  },
  mounted () {
    this.fetchData()
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 10
    },
    query: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    nextPage () {
      this.pageNumber++
      this.fetchData()
    },
    prevPage () {
      this.pageNumber--
      this.fetchData()
    },
    fetchData: function () {
      let params = {}
      let searchString = this.searchString
      if (searchString) {
        params['search'] = searchString
      }

      let pageNumber = this.pageNumber
      if (pageNumber === 0) {
        pageNumber = 1
      } else {
        pageNumber++
      }
      params['page'] = pageNumber
      this.$api('/starships/', (response => (this.starships = response.data.results, this.starshipsCount = response.data.count)), params)
    },
  },
  watch: {
    searchString (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$router.push({name: 'starships', query: {q: newValue}})
        this.fetchData()
      }
    },
    query (newValue, oldValue) {
      this.searchString = newValue
    }
  },
  computed: {
    pageCount () {
      let l = this.starshipsCount,
        s = this.size
      return Math.floor(l / s)
    },
    filteredStarships: function () {
      return this.starships.filter(function(el) {
       el.url = "starships/"+parseInt(el.url.replace(/\D+/g, ''))+'/'
        return true;
      });
    }
  }
}
</script>
