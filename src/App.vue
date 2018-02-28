<template>
  <div>
    <s-header :seller="seller"></s-header>
  </div>
</template>

<script type="text/ecmascript-6">
import SHeader from 'components/head/head'
import {ERR_OK} from 'common/js/config'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((resp) => {
      if (resp.data.errorNum === ERR_OK) {
        this.seller = resp.data.data
        console.log(this.seller)
      }
    })
  },
  components: {
    SHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
