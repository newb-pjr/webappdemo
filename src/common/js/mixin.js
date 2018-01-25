import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

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

export const playerMixin = {
	computed: {
		mode () {
			return playMode.sequence === this.playMode ? 'icon-sequence' : playMode.loop === this.playMode ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
				'playMode',
				'sequenceList',
        'playList',
        'currentSong'
			])
	},
	methods: {
		changeMode () {
			const mode = (this.playMode + 1) % 3
			this.setPlayMode(mode)
			let list = null
			if (mode === playMode.random) {
				list = shuffle(this.sequenceList)
			} else {
				list = this.sequenceList
			}
			let index = list.findIndex((item) => {
				return item.id === this.currentSong.id
			})
			this.setCurrentIndex(index)
			this.setPlayList(list)
		},
		...mapMutations({
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayMode: 'SET_PLAY_MODE',
			setPlayList: 'SET_PLAYLIST',
			setPlayingState: 'SET_PLAYING_STATE'
		})
	}
}

export const searchMixin = {
	data () {
		return {
			query: '',
			refreshDelay: 100
		}
	},
	methods: {
		onQueryChange (query) {
			this.query = query
		},
		blurInput () {
			this.$refs.searchBox.blur()
		},
		saveSearch () {
			this.saveSearchHistory(this.query)
		},
		select (key) {
			this.$refs.searchBox.setQuery(key)
		},
		...mapActions([
				'saveSearchHistory',
				'delectSearchHistory'
			])
	}
}