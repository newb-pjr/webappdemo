<template>
	<div class="cartcontrol">
		<transition name="rolling">
			<div class="minus" @click="minus" v-show="count>0">
				<i class="icon-remove_circle_outline inner"></i>
			</div>
		</transition>
		<span class="num" v-show="count>0">{{count}}</span>
		<div class="add" @click="add">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				count: 0
			}
		},
		methods: {
			minus () {
				if (this.count > 0) {
					this.count--
				}
			},
			add () {
				this.count++
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		.minus
			display: inline-block
			opacity: 1
			padding: 3px
			vertical-align: top
			transition: all .5s linear
			.inner
				display: inline-block
				font-size: 24px
				color: #00a0dc
				transition: all .5s linear
			&.rolling-enter,&.rolling-leave-to
				transform: translate3d(24px,0,0)
				opacity: 0
				.inner
					transform: rotate(180deg)
			&.rolling-enter-active,&.rolling-leave-avtive
				transition: all .5s linear
		.num
			display: inline-block
			width: 24px
			font-size: 10px
			color: $color-text-deepGray
			line-height: 30px
			text-align: center
		.add
			display: inline-block
			font-size: 24px
			color: #00a0dc
			padding: 3px
			vertical-align: top
</style>
