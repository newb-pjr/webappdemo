<template>
	<div class="goods">
		<ul class="goods-name">
			<li class="item" :class="active" v-for="(item, index) in goods" :key="index">
				<div class="cell">
					<div class="pic" :class="typePic(item.type)"></div>
					<span class="name">{{item.name}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
	import {ERR_OK} from 'common/js/config'
	import {typePicMixin} from 'common/js/mixin'

	export default {
		mixins: [typePicMixin],
		data () {
			return {
				goods: []
			}
		},
		created () {
			this.$http.get('api/goods').then((resp) => {
				if (ERR_OK === resp.data.errorNum) {
					this.goods = resp.data.data
				}
			})
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.goods
		display: flex
		.goods-name
			flex: 0 0 80px
			width: 80px
			padding 0 12px
			background-color: #f3f5f7
			.item
				display: table
				width: 100%
				height: 54px
				box-sizing: border-box
				font-size: 0
				border-bottom 1px solid rgba(7, 17, 27, 0.1)
				&:last-child
					border-bottom: 0
				&.active
					background-color: $color-text
					.name
						color: $color-text-black
				.cell
					display: table-cell
					vertical-align: middle
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
</style>
