<template>
	<div class="shopcart">
		<div class="outer-circle">
			<div class="inner-circle" :class="hasFoods">
				<i class="icon-shopping_cart"></i>
				<div class="badge" v-show="count>0">{{count}}</div>
			</div>
		</div>
		<div class="price">
			¥{{price}}
		</div>
		<div class="carriage">另需配送费¥10元</div>
		<div class="sellBtn" :class="{'canSellBtn':price-seller.minPrice>=0}" @click="bug">
			{{isSettlement}}
		</div>
		<div class="balls-container">
			<transition name="drop" v-for="(ball, index) in balls" :key="index" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
				<div class="ball" v-show="ball.show">
					<div class="inner" refs="inner"></div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {prefixStyle} from 'common/js/util'

	const transform = prefixStyle('transform')

	export default {
		data () {
			return {
				balls: [{
					show: false
				}, {
					show: false
				}, {
					show: false
				}, {
					show: false
				}, {
					show: false
				}],
				dropBalls: []
			}
		},
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			isSettlement () {
				return this.price - this.seller.minPrice >= 0 ? '去结算' : `¥${this.seller.minPrice}元起送`
			},
			hasFoods () {
				return this.count > 0 ? 'has-foods' : ''
			},
			...mapGetters([
					'count',
					'price'
				])
		},
		methods: {
			beforeEnter (el) {
				for (let i = 0; i < this.dropBalls.length; i++) {
					let ball = this.dropBalls[i]
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect()
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 32)
						el.style[transform] = `translate3d(0, ${y}px, 0)`
						this.$refs.inner[i].style[transform] = `translate3d(${x}px, 0, 0)`
					}
				}
			},
			enter (el) {
				el.style[transform] = `translate3d(0, 0, 0)`
				this.$refs.inner[i].style[transform] = `translate3d(0, 0, 0)`
			},
			afterEnter () {},
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					if (!this.balls[i].show) {
						this.balls[i].show = true
						this.balls[i].el = el
						this.dropBalls.push(this.balls[i])
						return
					}
				}
			},
			bug () {
				if (this.price - this.seller.minPrice >= 0) {
					alert('购买成功')
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		width: 100%
		height: 44px
		background-color: #141d27
		font-size: 0
		.outer-circle
			position: absolute
			left: 12px
			bottom: 2px
			width: 56px
			height: 56px
			padding: 6px
			border-radius: 50%
			background-color: #141d27
			box-sizing: border-box
			.inner-circle
				position: relative
				width: 44px
				height: 44px
				margin: 0 auto
				border-radius: 50%
				text-align: center
				background-color: rgba(255, 255, 255, 0.2)
				font-size: 24px
				line-height: 44px
				color: rgba(255, 255, 255, 0.4)
				&.has-foods
					background-color: rgb(0, 160, 220)
					color: $color-text
					.badge
						position: absolute
						top: -8px
						right: -6px
						width: 24px
						border-radius: 12px
						font-size: 9px
						font-weight: 700
						color: $color-text
						line-height: 16px
						background-color: $color-text-red
						text-align: center
						box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
		.price
			display: inline-block
			margin-top: 8px
			margin-left: 80px
			padding-right: 12px
			font-size: 16px
			color: rgba(255, 255, 255, 0.4)
			font-weight: 700
			line-height: 24px
			border-right 1px solid rgba(255,255,255,0.1)
		.carriage
			display: inline-block
			padding-left: 12px
			font-size: 16px
			color: rgba(255, 255, 255, 0.4)
			font-weight: 700
			line-height: 24px
		.sellBtn
			position: absolute
			right: 0
			bottom: 0
			width: 105px
			height: 44px
			padding: 0 8px
			box-sizing: border-box
			background-color: rgba(255, 255, 255, 0.2)
			line-height: 44px
			font-size: 12px
			color: rgba(255, 255, 255, 0.4)
			font-weight: 700
			text-align: center
			&.canSellBtn
				background-color: #00b43c
				color: $color-text
		.balls-container
			position: fixed
			left: 32px
			bottom: 22px
			.ball
				width: 16px
				height: 16px
				transition: all .4s
				.inner
					width: 100%
					height: 100%
					background-color: rgb(0, 160, 220)
					border-radius: 50%
					transition: all .4s
</style>
