<template>
	<div class="shopcart">
		<div class="outer-circle">
			<div class="inner-circle">
				<i class="icon-shopping_cart"></i>
			</div>
		</div>
		<div class="">
			¥0
		</div>
		<div class="">另需配送费¥10元</div>
		<div class="">
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
		.outer-circle
			width: 56px
			height: 56px
			margin: -14px 12px 0
			padding: 6px
			border-radius: 50%
			background-color: #141d27
			box-sizing: border-box
			.inner-circle
				width: 44px
				height: 44px
				margin: 0 auto
				border-radius: 50%
				text-align: center
				background-color: rgba(255, 255, 255, 0.2)
				font-size: 24px
				line-height: 44px
				color: rgba(255, 255, 255, 0.4)
</style>
