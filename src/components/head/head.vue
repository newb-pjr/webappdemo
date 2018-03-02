<template>
	<div class="header-container">
		<img class="avatar" :src="seller.avatar" width="64" height="64">
		<div class="info-container">
			<div class="title">
				<div class="brand"></div>
				<span class="name">{{seller.name}}</span>
			</div>
			<div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
			<div class="supports">
				<div class="type" :class="typePic"></div>
				<span class="desc" v-if="seller.supports">{{seller.supports[0].description}}</span>
			</div>
		</div>
		<div class="supports-number">
			<span class="number">{{seller.supports.length}}个</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		seller: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	computed: {
		typePic () {
			let cls
			if (!this.seller.supports) {
				return
			}
			switch (this.seller.supports[0].type) {
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
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import	'~common/stylus/index'
	.header-container
		position: relative
		padding-top: 24px
		padding-left: 24px
		background-color: #000
		font-size: 0
		.avatar
			display: inline-block
			vertical-align: top
			border-radius: 3px
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
		.supports-number
			position: absolute
			right: 12px
			bottom: 46px
			padding: 7px 8px
			background-color: rgba(0, 0, 0, 0.2)
			border-radius: 24px
			font-size: 10px
			color: $color-text
			font-weight: 200
			line-height: 12px
			.number
				margin-right: 2px
</style>
