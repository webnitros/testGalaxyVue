const Schema = {
  data () {
    return {
      isChange: true,
      schema: 'Loading',
    }
  },
  template: '<div>Schema  <pre>{{ getSchema }}</pre></div>',
  computed: {
    getSchema: function () {
      if (this.isChange) {
        this.isChange = false
        let $this = this
        this.$http({
          url: 'https://swapi.co/api/starships/schema?format=json',
          method: 'GET'
        }).then(function (response) {
          $this.schema = response.data
        }, function (response) {
          console.log('Error get fetchData Starship')
        })
      }
      return this.schema
    }
  },
}

const Starship = {
  data () {
    return {
      isChange: true,
      starship: 'Loading',
    }
  },
  props: ['id'],
  template: '<div>Корабль <pre>{{ getStarship }}</pre></div>',
  computed: {
    getStarship: function () {
      if (this.isChange) {
        this.isChange = false
        let $this = this
        this.$http({
          url: 'https://swapi.co/api/starships/' + this.id + '/?format=json',
          method: 'GET'
        }).then(function (response) {
          $this.starship = response.data
        }, function (response) {
          console.log('Error get fetchData Starship')
        })
      }
      return this.starship
    }
  },
}

const SearchStarships = {
  data () {
    return {
      isChange: true,
      pageNumber: 0,
      searchString: this.query,
      starship: [],
      starships: [],
      starshipsCount: 0
    }
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
      this.isChange = false
      let $this = this

      let apiURL = 'https://swapi.co/api/starships/?format=json'
      let searchString = this.searchString
      if (searchString) {
        apiURL += '&search=' + searchString
      }

      let pageNumber = this.pageNumber
      if (pageNumber === 0) {
        pageNumber = 1
      } else {
        pageNumber++
      }
      apiURL += '&page=' + pageNumber
      this.$http({
        url: apiURL,
        method: 'GET'
      }).then(function (response) {
        $this.starshipsCount = response.data.count
        $this.starships = response.data.results
      }, function (response) {
        console.log('Error fetchData')
      })
    },
    getStarship: function (url) {
      const id = parseInt(url.replace(/\D+/g, ''))
      this.$router.push('starships/' + id + '/')
    }
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
      if (this.isChange) {
        this.fetchData()
      }
      return this.starships
    }
  },
  template: `<div>
               <div class="bar">
                    <input type="text" v-model="searchString" placeholder="Введите имя коробля"/>
                </div>
                Всего Короблей: {{starshipsCount}}<br><br>
                <button :disabled="pageNumber === 0" @click="prevPage">prev</button>
                <button :disabled="pageNumber >= pageCount -1" @click="nextPage"> next</button>
                <br><br>
                <ul>
                    <li v-if="starships.length == 0">Loading</li>
                    <li v-for="starship in filteredStarships">
                        <span @click="getStarship(starship.url)">{{starship.name}}</span>
                    </li>
                </ul>
             </div>`
}

const router = new VueRouter({
  routes: [
    {path: '/starships/', name: 'starships', component: SearchStarships, props: (route) => ({query: route.query.q})},
    {path: '/starships/:id/', name: 'starship', component: Starship, props: true},
    {path: '/starships_schema/', name: 'schema', component: Schema, props: true},
  ]
})
new Vue({
  router,
  el: '#app'
})