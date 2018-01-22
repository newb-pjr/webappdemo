<template>
	<transition name="drop">
    <div class="top-tip" v-show="isShow">
      <slot></slot>
    </div>
  </transition>
</template>
<script type="text/ecmajavascript-6">
	export default {
		props: {
			delay: {
					type: Number,
					default: 2000
				}
		}
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			show () {
				this.isShow = true
				clearTimeout(timer)
				let timer = setTimeout(() => {
					this.hide()
				}, this.delay)
			},
			hide () {
				this.isShow = false
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.top-tip
	  position: fixed
	  top: 0
	  width: 100%
	  z-index: 500
	  background: $color-dialog-background
	  &.drop-enter-active, &.drop-leave-active
	    transition: all 0.3s
	  &.drop-enter, &.drop-leave-to
	    transform: translate3d(0, -100%, 0)
</style>