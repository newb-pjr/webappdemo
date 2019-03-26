<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <card :item="item"></card>
      </li>
    </ul>
  </div>
</template>

<script>
import {get} from '../../util'
import config from './../../config'
import Card from './../../components/card'

export default {
  data () {
    return {
      list: []
    }
  },
  onShow () {
    this._getBooksList()
  },
  methods: {
    _getBooksList () {
      get(config.booksListUrl).then((resp) => {
        this.list = resp.list
      })
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>

</style>
