<template>
	<div class="singer" ref="singer">
    <listview :data="singer" @select="selectSinger"></listview>
  	<router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  import { mapMutations } from 'vuex'
	export default {
		data () {
			return {
				singer: []
			}
		},
		created () {
			this._getSingerList()
		},
		methods: {
			...mapMutations({
				setSinger: 'SET_SINGER'
			}),
			selectSinger (singer) {
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			_getSingerList () {
				getSingerList().then((resp) => {
					if (resp.code === ERR_OK) {
						this.singer = this._normalize(resp.data.list)
					}
				})
			},
			_normalize (list) {
				let map = {
					hot: {
						title: '热门',
						items: []
					}
				}
				list.forEach((item, index) => {
					if (index < 10) {
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
					}
					let key = item.Findex
					if (!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				})
				console.log(map)
				let hot = []
				let all = []
				for (let key in map) {
					if (map[key].title.match(/[a-zA-Z]/)) {
						all.push(map[key])
					} else if (map[key].title === '热门') {
						hot.push(map[key])
					}
				}
				all.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(all)
			}
		},
		components: {
			Listview
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
