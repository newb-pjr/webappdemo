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
				<div class="favorite">
					<i class="icon-favorite"></i>
					<p class="text">已收藏</p>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<div class="name">公告与活动</div>
				<div class="content">{{seller.bulletin}}</div>
				<ul class="service">
					<li class="item" v-for="item in seller.supports">
						<div class="typePic" :class="typePic(item.type)"></div>
						<div class="description">{{item.description}}</div>
					</li>
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

	export default {
		mixins: [typePicMixin],
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
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
					.typePic
						display: inline-block
						width: 16px
						height: 16px
						margin-right: 6px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_4')
</style>
