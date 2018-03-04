<template>
	<div class="star" :class="starSize">
		<div class="item" :class="item" v-for="(item,index) in star" :key="index"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	const STAR_NUMBER = 5

	export default {
		props: {
			size: {
				type: Number,
				default: 48
			},
			rating: {
				type: Number,
				default: 0
			}
		},
		computed: {
			starSize () {
				return this.size === 48 ? 'star-48' : this.size === 36 ? 'star-36' : 'star-24'
			},
			star () {
				let score = (this.rating * 2 | 0) / 2
				console.log(this.rating, score)
				let result = []
				let int = score | 0
				let half = score % 1 !== 0
				for (let i = 0; i < int; i++) {
					result.push('all-star')
				}
				if (half) {
					result.push('half-star')
				}
				while (result.length < STAR_NUMBER) {
					result.push('no-star')
				}
				return result
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.star
		font-size: 0
		&.star-48
			.item
				display: inline-block
				width: 20px
				height: 20px
				margin-right: 22px
				&:last-child
					margin-right: 0
				&.all-star
					bg-image('star48_on')
				&.half-star
					bg-image('star48_half')
				&.no-star
					bg-image('star48_off')
				background-size: 20px 20px
				background-repeat: no-repeat
		&.star-36
			.item
				display: inline-block
				font-size: 0
				width: 15px
				height: 15px
				margin-right: 6px
				&:last-child
					margin-right: 0
				&.all-star
					bg-image('star36_on')
				&.half-star
					bg-image('star36_half')
				&.no-star
					bg-image('star36_off')
				background-size: 15px 15px
				background-repeat: no-repeat
		&.star-24
			.item
				display: inline-block
				font-size: 0
				width: 10px
				height: 10px
				margin-right: 3px
				&:last-child
					margin-right: 0
				&.all-star
					bg-image('star24_on')
				&.half-star
					bg-image('star24_half')
				&.no-star
					bg-image('star24_off')
				background-size: 10px 10px
				background-repeat: no-repeat
</style>
