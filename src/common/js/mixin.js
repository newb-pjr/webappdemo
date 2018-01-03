import { mapGetters } from 'vuex'

export const playListMixin = {
	computed: {
		...mapGetters([
			'playList'
		])
	},
	mounted () {
		this.handlePlayList(this.playList)
	},
	activated () {
		this.handlePlayList(this.playList)
	},
	watch: {
		playList (newVal) {
			this.handlePlayList(newVal)
		}
	},
	methods: {
		handlePlayList (playList) {
			throw new Error('component must complement handlePlayList method')
		}
	}
}