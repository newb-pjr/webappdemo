<template>
	<div class="shopcart">
		<div class="outer-circle">
			<div class="inner-circle has-foods">
				<i class="icon-shopping_cart"></i>
				<div class="badge"></div>
			</div>
		</div>
		<div class="price">
			¥0
		</div>
		<div class="carriage">另需配送费¥10元</div>
		<div class="sellBtn">
			¥20元起送
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {}
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
</style>
