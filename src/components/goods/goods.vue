<template>
	<div class="goods">
		<scroll class="goods-name">
			<ul>
				<li class="item" :class="{'active':index===currentIndex}" v-for="(item, index) in goods" :key="index" @click="select(index)">
					<div class="cell" :class="{'no-border':index===currentIndex || (index+1)===currentIndex}">
						<div class="pic" :class="typePic(item.type)" v-if="item.type>-1"></div>
						<span class="name">{{item.name}}</span>
					</div>
				</li>
			</ul>
		</scroll>
		<scroll class="foods-container" :listen-scroll="listenScroll" :probe-type="probeType" @scroll="scroll" ref="foodsScroll">
			<div>
				<div v-for="(item, index) in goods" :key="index" ref="foods">
					<div class="title">{{item.name}}</div>
					<ul class="detail-container">
						<li class="detail" v-for="(foodItem, index) in item.foods" :key="index">
							<img :src="foodItem.icon" width="64" height="64">
							<div class="info">
								<p class="name">{{foodItem.name}}</p>
								<p class="desc">{{foodItem.description}}</p>
								<p class="sell">
									<span>月售{{foodItem.sellCount}}份</span><span>好评率{{foodItem.rating}}%</span>
								</p>
								<p class="price">
									<span class="currentPrice"><i class="symbol">¥</i>{{foodItem.price}}</span>
									<span class="oldPrice" v-if="foodItem.oldPrice"><i class="symbol">¥</i>{{foodItem.oldPrice}}</span>
								</p>
							</div>
							<cart-control class="cartcontrol" :food="foodItem"></cart-control>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
	</div>
</template>
<script type="text/ecmascript-6">
	import {ERR_OK} from 'common/js/config'
	import {typePicMixin} from 'common/js/mixin'
	// import BScroll from 'better-scroll'
	import Scroll from 'base/scroll/scroll'
	import CartControl from 'base/cartcontrol/cartcontrol'

	export default {
		mixins: [typePicMixin],
		data () {
			return {
				goods: [],
				foods: {},
				currentIndex: 0,
				listenScroll: true,
				listHeight: [],
				probeType: 3
			}
		},
		created () {
			this.$http.get('api/goods').then((resp) => {
				if (ERR_OK === resp.data.errorNum) {
					this.goods = resp.data.data
					this.$nextTick(() => {
							this._calculateHeight()
					})
				}
			})
		},
		methods: {
			select (index) {
				this.currentIndex = index
				this.$refs.foodsScroll.scrollToElement(this.$refs.foods[index], 1000)
			},
			scroll (pos) {
				let scrollY = pos.y | 0
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					if (-scrollY >= height1 && -scrollY < height2) {
						this.currentIndex = i
						return
					}
					if (!height2) {
						this.currentIndex = this.listHeight.length - 2
						return
					}
					if (scrollY > 0) {
						this.currentIndex = 0
						return
					}
				}
			},
			_calculateHeight () {
				let arr = []
				let height = 0
				arr.push(height)
				for (let i = 0; i < this.$refs.foods.length; i++) {
					height += this.$refs.foods[i].clientHeight
					arr.push(height)
				}
				this.listHeight = arr
			}
		},
		components: {
			Scroll,
			CartControl
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.goods
		position: absolute
		top: 175px
		bottom: 44px
		display: flex
		overflow: hidden
		.goods-name
			flex: 0 0 80px
			width: 80px
			background-color: #f3f5f7
			.item
				display: table
				width: 100%
				padding 0 12px
				height: 54px
				box-sizing: border-box
				font-size: 0
				&:last-child
					border-bottom: 0
				&.active
					background-color: $color-text
					.name
						color: $color-text-black
				.cell
					display: table-cell
					vertical-align: middle
					border-bottom 1px solid rgba(7, 17, 27, 0.1)
					&.no-border{
						border-bottom: 0
					}
					.pic
						display: inline-block
						width: 12px
						height: 12px
						background-size: 12px 12px
						background-repeat: no-repeat
						vertical-align: top
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
					.name
						font-size: 12px
						color: rgb(77, 85, 93)
						line-height: 14px
						font-weight: 200
		.foods-container
			flex: 1
			.title
				width: 100%
				height: 26px
				border-left 2px solid #d9dde1
				padding-left: 13px
				box-sizing: border-box
				background-color: #f3f5f7
				font-size: 12px
				color: $color-text-deepGray
				line-height: 26px
			.detail-container
				font-size: 0
				padding: 0 18px
				.detail
					position: relative
					display: flex
					padding: 18px 0
					border-bottom 1px solid gray(0.1)
					&:last-child
						border-bottom: 0
					.cartcontrol
						position: absolute
						right: 0
						bottom: 15px
					img
						flex: 0 0 64px
					.info
						flex: 1
						vertical-align: top
						margin-left: 10px
						.name
							margin-top: 2px
							font-size: 14px
							color: $color-text-black
							line-height: 14px
						.desc,.sell
							margin-top: 8px
							font-size: 10px
							color: $color-text-deepGray
							line-height: 10px
						.sell
							span
								margin-right: 12px
								&:last-child
									margin-right: 0
						.price
							.symbol
								font-size: 10px
								font-weight: normal
							.currentPrice
								margin-right: 8px
								font-size: 14px
								color: $color-text-red
								font-weight: 700
								line-height: 24px
							.oldPrice
								font-size: 10px
								color: $color-text-deepGray
								font-weight: 700
								line-height: 24px
								text-decoration: line-through
</style>
