<template>
	<transition name="slide">
	    <music-list :title="title" :bg-img="bgImg" :songs="songs" :rank="rank"></music-list>
	  </transition>
</template>
<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex'
	import MusicList from 'components/music-list/music-list'
	import { getMusicList } from 'api/rank'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'

	export default {
		data () {
			return {
				songs: [],
				rank: true
			}
		},
		computed: {
			title () {
				return this.topList.topTitle
			},
			bgImg () {
				if (this.songs.length) {
					return this.songs[0].image
				}
				return ''
			},
			...mapGetters([
				'topList'
			])
		},
		created () {
			this._getMusicList()
		},
		methods: {
			_getMusicList () {
				if (!this.topList.id) {
					this.$router.push('/rank')
					return
				}
				getMusicList(this.topList.id).then((resp) => {
					if (ERR_OK === resp.code) {
						this.songs = this._normalize(resp.songlist)
					}
				})
			},
			_normalize (list) {
				let ret = []
				list.forEach((item) => {
					let musicData = item.data
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter-active, .slide-leave-active
	  transition: all 0.3s ease

	.slide-enter, .slide-leave-to
	  transform: translate3d(100%, 0, 0)
</style>