<template>
	<div class="header-container" ref="header">
		<div class="header-info">
			<img class="avatar" :src="seller.avatar" width="64" height="64">
			<div class="info-container">
				<div class="title">
					<div class="brand"></div>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
				<div class="supports">
					<div class="type" :class="typePic(0)"></div>
					<span class="desc" v-if="seller.supports">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-container" @click="show()">
			<div class="bulletin-img"></div>
			<div class="desc">{{seller.bulletin}}</div>
			<i class="icon icon-keyboard_arrow_right"></i>
		</div>
		<div class="supports-number">
			<span class="number" v-if="seller.supports" @click="show">{{seller.supports.length}}个</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="backgroud">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="slide">
			<div class="details-container" v-show="isShow">
				<div class="details">
					<div class="name">{{seller.name}}</div>
					<star class="star-container" :size="size" :rating="this.seller.score"></star>
					<div class="title">
						<div class="line"></div>
						<div class="topic">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="discount-container">
						<li class="item" v-if="seller.supports" v-for="(item, index) in seller.supports" :key="index">
							<i class="icon" :class="typePic(index)"></i>
							<span class="description">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="topic">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}</div>
				</div>
				<div class="close" @click="hide">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>
<script type="text/ecmascript-6">
import Star from 'base/star/star'
export default {
	data () {
		return {
			isShow: false,
			size: 48,
			rating: ''
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
	methods: {
		show () {
			this.isShow = true
		},
		hide () {
			this.isShow = false
		},
		typePic (index) {
			let cls
			if (!this.seller.supports) {
				return
			}
			switch (index) {
				case 0:
					cls = 'decrease'
					break
				case 1:
					cls = 'discount'
					break
				case 2:
					cls = 'special'
					break
				case 3:
					cls = 'invoice'
					break
				case 4:
					cls = 'guarantee'
					break
			}
			return cls
		}
	},
	components: {
		Star
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import	'~common/stylus/mixin'
	@import	'~common/stylus/variable'
	.header-container
		position: relative
		font-size: 0
		bg-gray(0.5)
		.header-info
			padding: 24px 0px 18px 24px
			.avatar
				display: inline-block
				vertical-align: top
				border-radius: 2px
			.info-container
				display: inline-block
				margin-left: 16px
			.title
				margin-bottom: 5px
				margin-top: 2px
				font-size: 0
				color: $color-text
				font-weight: bold
				line-height: 18px
				.brand
					display: inline-block
					width: 30px
					height: 18px
					bg-image('brand')
					background-size: 30px 18px
					background-repeat: no-repeat
					vertical-align: top
				.name
					display: inline-block
					margin-left: 6px
					font-size: 16px
			.description
				margin-bottom: 8px
				font-size: 12px
				color: $color-text
				font-weight: 200
				line-height: 12px
			.supports
				font-size: 0
				.type
					display: inline-block
					margin-right: 4px
					width: 12px
					height: 12px
					vertical-align: top
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
				.desc
					display: inline-block
					font-size: 10px
					color: $color-text
					font-weight: 200
					line-height: 12px
		.bulletin-container
			height: 28px
			padding: 0 12px
			font-size: 0
			bg-gray(0.2)
			.bulletin-img
				display: inline-block
				width: 22px
				height: 12px
				margin-top: 8px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
				vertical-align: top
			.desc
				display: inline-block
				width: 88%
				margin-left: 4px
				font-size: 10px
				font-weight: 200
				line-height: 28px
				color: $color-text
				vertical-align: top
				text-overflow: ellipsis
				white-space: nowrap
				overflow: hidden
			.icon
				display: inline-block
				font-size: 10px
				font-weight: 200
				line-height: 28px
				color: $color-text
				margin-left: 2px
		.supports-number
			position: absolute
			right: 12px
			bottom: 46px
			padding: 7px 8px
			background-color: rgba(0, 0, 0, 0.2)
			border-radius: 24px
			font-size: 0
			color: $color-text
			font-weight: 200
			.number
				font-size: 10px
				line-height: 12px
				margin-right: 2px
			.icon-keyboard_arrow_right
				line-height: 12px
				font-size: 10px
		.backgroud
			position: absolute
			width: 100%
			height: 100%
			top: 0
			left: 0
			z-index: -1
			filter: blur(10px)
			overflow: hidden
		.details-container
			position: fixed
			top: 0
			left: 0
			width: 100%
			height: 100%
			bg-gray(0.8)
			// filter: blur(10px)
			overflow-y: auto
			overflow-x: hidden
			z-index: 100
			&.slide-enter, &.slide-leave-to
				transform: translate3d(100%, 0, 0)
			&.slide-enter-active, &.slide-leave-active
				transition: all .5s
			.details
				width: 100%
				min-height: 100%
				padding: 64px 36px 64px 36px
				box-sizing: border-box
				.name
					width: 100%
					text-align: center
					font-size: 16px
					font-weight: 700
					color: $color-text
					line-height: 16px
				.star-container
					margin: 16px 0 28px 0
					text-align: center
				.title
					display: flex
					.line
						flex: 1
						margin-top: 7px
						border-top: 1px solid rgba(255,255,255,0.2)
					.topic
						flex: 0 0 80px
						width: 80px
						font-size: 14px
						font-weight: 700
						color: $color-text
						line-height: 14px
						text-align: center
				.discount-container
					padding: 24px 12px 28px 12px
					.item
						margin-bottom: 12px
						&:last-child
							margin-bottom: 0
						.icon
							display: inline-block
							width: 16px
							height: 16px
							margin-right: 6px
							background-size: 16px 16px
							background-repeat: no-repeat
							vertical-align: top
							&.decrease
								bg-image('decrease_2')
							&.discount
								bg-image('discount_2')
							&.guarantee
								bg-image('guarantee_2')
							&.invoice
								bg-image('invoice_2')
							&.special
								bg-image('special_2')
						.description
							font-size: 12px
							font-weight: 200
							color: $color-text
							line-height: 16px
				.bulletin
					padding: 24px 12px 0 12px
					font-size: 12px
					font-weight: 200
					color: $color-text
					line-height: 24px
			.close
				position: relative
				left: 50%
				margin-top: -64px
				font-size: 32px
				color: rgba(255,255,255,0.5)
				margin-left: -16px
	</style>
