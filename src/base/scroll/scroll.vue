<template>
	<div ref="scroll">
		<slot></slot>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	export default {
		props: {
			data: {
				type: Array,
				default: null
			},
			click: {
				type: Boolean,
				default: true
			},
			probeType: {
				type: Number,
				default: 1
			}
		},
		mounted () {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		methods: {
			refresh () {
				this.scroll && this.scroll.refresh()
			},
			_initScroll () {
				this.scroll = new BScroll(this.$refs.scroll, {
					click: this.click,
					probeType: this.probeType
				})
			}
		},
		watch: {
			data () {
				setTimeout(() => {
					this._initScroll()
					console.log(this.data)
				}, 20)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
