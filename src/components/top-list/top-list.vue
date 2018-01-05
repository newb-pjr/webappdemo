<template>
	<transition name="slide">
	    <music-list :title="title" :bg-img="bgImg"></music-list>
	  </transition>
</template>
<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex'
	import MusicList from 'components/music-list/music-list'

	export default {
		computed: {
			title () {
				return this.topList.topTitle
			},
			bgImg () {
				return this.topList.picUrl
			},
			...mapGetters([
				'topList'
			])
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