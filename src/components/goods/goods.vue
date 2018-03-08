<template>
	<div class="goods">
		<div class="goods-name" ref="menuWrapper">
			<ul>
				<li class="item" :class="{'active':index===currentIndex}" v-for="(item, index) in goods" :key="index">
					<div class="cell" :class="{'no-border':index===currentIndex || (index+1)===currentIndex}">
						<div class="pic" :class="typePic(item.type)" v-if="item.type>-1"></div>
						<span class="name">{{item.name}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="foods-container" ref="foodsWrapper">
			<div>
				<div v-for="(item, index) in goods" :key="index">
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
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {ERR_OK} from 'common/js/config'
	import {typePicMixin} from 'common/js/mixin'
	import BScroll from 'better-scroll'
	// import Scroll from 'base/scroll/scroll'

	export default {
		mixins: [typePicMixin],
		data () {
			return {
				goods: [],
				currentIndex: 2
			}
		},
		created () {
			this.$http.get('api/goods').then((resp) => {
				if (ERR_OK === resp.data.errorNum) {
					this.goods = resp.data.data
					this.$nextTick(() => {
            this._initScroll()
          })
				}
			})
		},
		methods: {
			_initScroll () {
				this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
			}
		}
		// components: {
		// 	Scroll
		// }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.goods
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
					display: flex
					padding: 18px 0
					border-bottom 1px solid gray(0.1)
					&:last-child
						border-bottom: 0
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
