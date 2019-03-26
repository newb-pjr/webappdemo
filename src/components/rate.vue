<template>
  <div class="rate-container">
    <div>☆☆☆☆☆</div>
    <div class="star" :style="starNum">★★★★★</div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0
    }
  },
  computed: {
    starNum () {
      return `width: ${this.rate / 10 * 100}%`
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
.rate-container
  display: inline-block
  position: relative
  font-size: 26px
  .star
    position: absolute
    top: 0
    left: 0
    overflow: hidden
</style>
