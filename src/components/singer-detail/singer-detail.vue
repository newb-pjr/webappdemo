<template>
	<transition name="slide">
		<music-list :title="title" :bg-img="bgImg" :songs="song"></music-list>
	</transition>
</template>
<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex'
	import { getMusicList } from 'api/singer'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'
	import MusicList from 'components/music-list/music-list'
	export default {
		data () {
			return {
				song: []
			}
		},
		computed: {
			title () {
				return this.singer.name
			},
			bgImg () {
				return this.singer.avatar
			},
			...mapGetters(['singer'])
		},
		created () {
			this._getDetails()
		},
		methods: {
			_getDetails () {
				if (!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getMusicList(this.singer.id).then((resp) => {
					if (resp.code === ERR_OK) {
						this.song = this._normalize(resp.data.list)
					}
				})
			},
			_normalize (list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					if (musicData.albummid && musicData.songid) {
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
		transition: all .3s;

	.slide-enter
		transform: translate3d(100%,0,0);

	.slide-leave-active
		transform: translate3d(100%,0,0);

</style>