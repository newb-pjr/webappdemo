<template>
	<transition name="slide">
		<music-list :title="title" :bg-img="bgImg" :songs="songs"></music-list>
	</transition>
</template>
<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import { mapGetters } from 'vuex'
	import { getSongList } from 'api/recommend'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'

	export default {
		data () {
			return {
				songs: []
			}
		},
		computed: {
			...mapGetters([
				'disc'
			]),
			title () {
				return this.disc.dissname
			},
			bgImg () {
				return this.disc.imgurl
			}
		},
		created () {
			this._getSongList()
		},
		methods: {
			_getSongList () {
				if (!this.disc.dissid) {
					this.$router.push('/recommend')
					return
				}
				getSongList(this.disc.dissid).then((resp) => {
					if (resp.code === ERR_OK) {
						this.songs = this._normalize(resp.cdlist[0].songlist)
					}
				})
			},
			_normalize (list) {
				let ret = []
				list.forEach((musicData) => {
					ret.push(createSong(musicData))
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
		transition: all .3s;

	.slide-enter
		transform: translate3d(100%,0,0);

	.slide-leave-active
		transform: translate3d(100%,0,0);

</style>