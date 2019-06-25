<template>
  <div id="app">
      <ul>
        <li>
          <router-link to="/starships">/starships/</router-link>
        </li>
        <li>
          <router-link to="/schema">/schema/</router-link>
        </li>
      </ul>

      <h1>{{ title }}</h1>
      <router-view></router-view>
  </div>
</template>

<script>
import './scss/main.scss';

export default {
  name: 'app',
  data () {
    return {
      title: 'Звездный флот'
    }
  }
}
</script>
