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
				<div class="type" :class=""></div>
				<span class="desc">{{seller.supports[0].description}}</span>
			</div>
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
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import	'~common/stylus/mixin'
	@import	'~common/stylus/variable'
	.header-container
		padding-top: 24px
		padding-left: 24px
		background-color: #000
		font-size: 0
		.avatar
			display: inline-block
			vertical-align: top
		.info-container
			display: inline-block
			margin-left: 16px
			.title
				margin-bottom: 2px
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
				font-size: 12px
				color: $color-text
				font-weight: 200
				line-height: 12px
			.supports
				font-size: 0
				.type
					width: 12px
					height: 12px
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
					font-size: 10px
					color: $color-text
					font-weight: 200
					line-height: 12px
</style>
