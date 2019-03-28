<template>
  <div>{{this.bookID}}</div>
</template>

<script>
export default {
  data () {
    return {
      bookID: -1
    }
  },
  mounted () {
    this.bookID = this.$root.$mp.query.id
  }
}
</script>

<style scoped>

</style>
