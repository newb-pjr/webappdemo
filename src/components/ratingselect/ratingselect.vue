<template>
	<div class="select">
		<div class="title">商品评价</div>
		<ul>
			<li class="blue">
				<span class="name">{{all.name}}</span><span class="num">{{all.num}}</span>
			</li>
			<li class="blue">
				<span class="name">{{good.name}}</span><span class="num">{{good.num}}</span>
			</li>
			<li class="gray">
				<span class="name">{{bad.name}}</span><span class="num">{{bad.num}}</span>
			</li>
		</ul>
		<div class="choose">
			<i class="icon-check_circle"></i><span class="choose-name">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			all: {
				type: Object,
				default () {
					return {
						name: '全部',
						num: 0
					}
				}
			},
			good: {
				type: Object,
				default () {
					return {
						name: '满意',
						num: 0
					}
				}
			},
			bad: {
				type: Object,
				default () {
					return {
						name: '不满意',
						num: 0
					}
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.select
		padding: 18px 18px 0
		.title
			font-size: 14px
			color: $color-text-black
			line-height: 14px
		ul
			margin-top: 18px
			padding-bottom: 18px
			border-bottom 1px solid gray(0.1)
			li
				display: inline-block
				padding: 8px 12px
				margin-right: 8px
				color: rgb(77, 85, 93)
				line-height: 16px
				border-radius: 1px
				&:last-child
					margin-right: 0
				.name
					font-size: 12px
					margin-right: 3px
				.num
					font-size: 8px
				&.blue
					background-color: rgba(0, 160, 220, 0.2)
				&.gray
					background-color: rgba(77, 85, 93, 0.2)
		.choose
			padding: 12px 0
			.icon-check_circle
				font-size: 24px
				color: $color-text-deepGray
				line-height: 24px
				margin-right: 4px
			.choose-name
				font-size: 12px
				color: $color-text-deepGray
				line-height: 24px
				vertical-align: top
</style>
