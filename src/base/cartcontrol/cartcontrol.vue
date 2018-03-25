<template>
	<div class="cartcontrol">
		<transition name="rolling">
			<div class="minus" @click.stop="minus" v-show="food.count>0">
				<i class="icon-remove_circle_outline inner"></i>
			</div>
		</transition>
		<span class="num" v-show="food.count">{{food.count}}</span>
		<div class="add" @click.stop="add">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {mapActions} from 'vuex'
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			sub () {
				return this.food.count
			}
		},
		methods: {
			...mapActions([
					'cartCont'
				]),
			minus () {
				if (this.food.count > 0) {
					this.food.count--
					Vue.set(this.food, 'count', this.food.count)
				}
			},
			add (e) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
					Vue.set(this.food, 'count', this.food.count)
				}
				this.$emit('drop', e.target)
			}
		},
		watch: {
			sub () {
				this.cartCont(this.food)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.cartcontrol
		font-size: 0
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
				// transition: all .5s linear
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
