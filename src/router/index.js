import Vue from 'vue'
import Router from 'vue-router'
import Starships from './../components/starships.vue'
import Starship from './../components/starship.vue'
import Schema from './../components/schema.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/starships/', name: 'starships', component: Starships, props: (route) => ({query: route.query.q})},
    {path: '/starships/:id/', name: 'starship', component: Starship, props: true},
    {path: '/schema/', name: 'schema', component: Schema, props: true},
  ]
})