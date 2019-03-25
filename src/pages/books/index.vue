<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
import {get} from '../../util'
import config from './../../config'

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
  }
}
</script>

<style scoped>

</style>
