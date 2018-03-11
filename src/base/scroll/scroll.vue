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
			},
			listenScroll: {
				type: Boolean,
				default: false
			}
		},
		mounted () {
			this.$nextTick(() => {
				this._initScroll()
			})
		},
		methods: {
			refresh () {
				this.scroll && this.scroll.refresh()
			},
			scrollToElement (...args) {
				console.log(...args)
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, args)
			},
			_initScroll () {
				this.scroll = new BScroll(this.$refs.scroll, {
					click: this.click,
					probeType: this.probeType
				})
				if (this.listenScroll) {
					this.scroll.on('scroll', (pos) => {
						this.$emit('scroll', pos)
					})
				}
			}
		},
		watch: {
			data () {
				this.$nextTick(() => {
					this._initScroll()
				})
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
