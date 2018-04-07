<template>
	<scroll class="seller-container">
		<div>
			<div class="top">
				<div class="name">{{seller.name}}</div>
				<div class="detail">
					<star class="star-container" :size="36" :rating="seller.score"></star>
					<span class="ratingCount">({{seller.ratingCount}})</span>
					<span class="sellCount">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="info">
					<li class="item">
						<div class="title">起送价</div>
						<div class="content">
							<span class="minPrice">{{seller.minPrice}}</span><span class="unit">元</span>
						</div>
					</li>
					<li class="item">
						<div class="title">商家配送</div>
						<div class="content">
							<span class="minPrice">{{seller.deliveryPrice}}</span><span class="unit">元</span>
						</div>
					</li>
					<li class="item">
						<div class="title">平均配送时间</div>
						<div class="content">
							<span class="minPrice">{{seller.deliveryTime}}</span><span class="unit">分钟</span>
						</div>
					</li>
				</ul>
				<div class="favorite" :class="{'no-favorite':isFavorite===false}" @click="favorite">
					<i class="icon-favorite"></i>
					<p class="text">{{favoriteText}}</p>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<div class="name">公告与活动</div>
				<div class="content">{{seller.bulletin}}</div>
				<ul class="service">
					<li class="item" v-for="(item, index) in seller.supports" :key="index">
						<div class="typePic" :class="typePic(item.type)"></div>
						<div class="description">{{item.description}}</div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="sellerPic">
				<div class="name">商家实景</div>
				<scroll :eventPassthrough="eventPassthrough" :scrollX="scrollX" class="picScroll">
					<ul ref="picList">
						<li v-for="(item, index) in seller.pics" :key="index" ref="picItem">
							<img :src="item" width="120" height="90">
						</li>
					</ul>
				</scroll>
			</div>
			<split></split>
			<div class="seller-info">
				<div class="name">商家信息</div>
				<ul>
					<li v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
				</ul>
			</div>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import Star from 'base/star/star'
	import Split from 'base/split/split'
	import {typePicMixin} from 'common/js/mixin'

	const MARGINL = 6

	export default {
		mixins: [typePicMixin],
		data () {
			return {
				eventPassthrough: 'vertical',
				scrollX: true,
				isFavorite: true
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
			favoriteText () {
				return this.isFavorite ? '已收藏' : '未收藏'
			}
		},
		watch: {
			seller () {
				console.log('watch')
				this._initPics()
			}
		},
		// activated () {
		// 	console.log('activated')
		// 	this._initPics()
		// },
		mounted () {
			console.log('mounted')
			this._initPics()
		},
		// created () {
		// 	this._initPics()
		// 	console.log('created')
		// },
		methods: {
			favorite () {
				this.isFavorite = !this.isFavorite
			},
			_initPics () {
				// this.$nextTick(() => {
				// 	console.log(this.$refs)
				// 	let width = this.$refs.picItem[0].offsetWidth * this.$refs.picItem.length + (MARGINL * (this.$refs.picItem.length - 1))
				// 	this.$refs.picList.style.width = width + 'px'
				// })
				setTimeout(() => {
					let width = this.$refs.picItem[0].offsetWidth * this.$refs.picItem.length + (MARGINL * (this.$refs.picItem.length - 1))
					this.$refs.picList.style.width = width + 'px'
				}, 20)
			}
		},
		components: {
			Scroll,
			Star,
			Split
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.seller-container
		position: fixed
		top: 175px
		bottom: 44px
		width: 100%
		overflow: hidden
		.top
			position: relative
			padding: 18px
			.name
				margin-bottom: 8px
				font-size: 14px
				color: $color-text-black
				line-height: 14px
			.detail
				padding-bottom: 18px
				font-size: 0
				color: rgb(77, 85, 93)
				border-bottom 1px solid gray(0.1)
				.star-container
					display: inline-block
					margin-right: 8px
					vertical-align: top
				.ratingCount
					display: inline-block
					margin-right: 12px
					font-size: 10px
					line-height: 18px
				.sellCount
					display: inline-block
					font-size: 10px
					line-height: 18px
			.info
				display: flex
				padding-top: 18px
				text-align: center
				.item
					flex: 1
					border-right 1px solid gray(0.1)
					&:last-child
						border-right: 0
					.title
						margin-bottom: 4px
						font-size: 10px
						color: $color-text-deepGray
						line-height: 10px
					.content
						font-weight: 200
						color: $color-text-black
						line-height: 24px
						.minPrice
							font-size: 24px
						.unit
							font-size: 10px
			.favorite
				position: absolute
				top: 18px
				right: 18px
				text-align: center
				&.no-favorite
					.icon-favorite
						color: $color-text-deepGray
				.icon-favorite
					display: inline-block
					margin-bottom: 4px
					font-size: 24px
					color: $color-text-red
					line-height: 24px
				.text
					font-size: 10px
					color: rgb(77, 85, 93)
					line-height: 10px
		.bulletin
			padding: 18px 18px 0
			.name
				margin-bottom: 8px
				font-size: 14px
				color: $color-text-black
				line-height: 14px
			.content
				padding: 0 12px 16px
				font-size: 12px
				font-weight: 200
				color: $color-text-red
				line-height: 24px
			.service
				.item
					padding: 16px 12px
					border-top: 1px solid gray(0.1)
					font-size: 0
					.typePic
						display: inline-block
						width: 16px
						height: 16px
						margin-right: 6px
						background-repeat: no-repeat
						background-size: 16px 16px
						vertical-align: top
						&.decrease
							bg-image('decrease_4')
						&.discount
							bg-image('discount_4')
						&.special
							bg-image('special_4')
						&.invoice
							bg-image('invoice_4')
						&.guarantee
							bg-image('guarantee_4')
					.description
						display: inline-block
						font-size: 12px
						font-weight: 200
						color: $color-text-black
						line-height: 16px
		.sellerPic
			padding: 18px 0 18px 18px
			.name
				margin-bottom: 12px
				font-size: 14px
				color: $color-text-black
				line-height: 14px
			.picScroll
				position: relative
				ul
					li
						display: inline-block
						width: 120px
						height: 90px
						margin-right: 6px
						&:last-child
							margin-right: 0
		.seller-info
			padding: 18px 18px 0
			.name
				margin-bottom: 12px
				font-size: 14px
				color: $color-text-black
				line-height: 14px
			ul
				li
					padding: 16px 12px
					border-top: 1px solid gray(0.1)
					font-size: 12px
					font-weight: 200
					color: $color-text-black
					line-height: 16px
</style>
