<template>
    <div>
        <div v-if="schema.length === 0">Loading</div>
        <div v-else>
            <pre>{{ schema }}</pre>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      schema: [],
    }
  },
  mounted () {
    this.$api('/starships/schema', (response => (this.schema = response.data)))
  }
}
</script>
