<template>
    <div>
        <div v-if="starship.length === 0">Loading</div>
        <div v-else>
            <h3>{{ starship.name }}</h3>
            <pre>{{ starship }}</pre>
        </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      starship: [],
    }
  },
  mounted () {
    this.$api('/starships/'+ this.id, (response => (this.starship = response.data)))
  },
  props: ['id'],
}
</script>
