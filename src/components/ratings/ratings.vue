<template>
	<scroll class="ratings-container">
		<div>
			<div class="seller-container">
				<div class="left">
					<div class="score">{{this.seller.score}}</div>
					<div class="name">综合评分</div>
					<div class="rankRate">高于周边商家{{this.seller.rankRate}}%</div>
				</div>
				<div class="right">
					<div class="score-container">
						<div class="name">服务态度</div>
						<star class="star" :size="36" :rating="this.seller.serviceScore"></star>.
						<div class="score">{{this.seller.serviceScore}}</div>
					</div>
					<div class="score-container">
						<div class="name">出品得分</div>
						<star class="star" :size="36" :rating="this.seller.foodScore"></star>
						<div class="score">{{this.seller.foodScore}}</div>
					</div>
					<div class="score-container margin-none">
						<div class="name">送达时间</div>
						<div class="time">{{this.seller.deliveryTime}}分钟</div>
					</div>
				</div>
			</div>
			<split></split>
			<div class="rating-select">
				<rating-select :all="all" :good="good" :bad="bad" @hasContent="hasContChange" @select="onSelect"></rating-select>
			</div>
			<ul class="ratingList">
				<li v-show="showComment(item.text, item.rateType)" v-for="(item, index) in ratings" :key="index">
					<div class="avatar">
						<img :src="item.avatar" width="28" height="28">
					</div>
					<div class="details">
						<div class="info">
							<div class="username">{{item.username}}</div>
							<div class="rateTime">{{item.rateTime | formatDate}}</div>
						</div>
						<div class="star">
							<star class="star-container" :size="24" :rating="item.score"></star><span class="time">{{item.deliveryTime}}分钟送达</span>
						</div>
						<div class="text">{{item.text}}</div>
						<div class="recommend" v-if="item.recommend.length>0">
							<i class="icon-thumb_up"></i>
							<div class="recommend-item" v-for="(recoItem, index) in item.recommend" :key="index">{{recoItem}}</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
	import {ERR_OK} from 'common/js/config'
	import Star from 'base/star/star'
	import Split from 'base/split/split'
	import RatingSelect from 'base/ratingselect/ratingselect'
	import {formatDate} from 'common/js/date'
	import Scroll from 'base/scroll/scroll'
	import {ratingMixin} from 'common/js/mixin'

	const POSITIVE = 0
	const NEGATIVE = 1

	export default {
		mixins: [ratingMixin],
		data () {
			return {
				ratings: []
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
			all () {
				return {name: '全部', num: this.ratings.length}
			},
			good () {
				let goodArr = this.ratings.filter((type) => {
					return type.rateType === POSITIVE
				})
				return {name: '满意', num: goodArr.length}
			},
			bad () {
				let badArr = this.ratings.filter((type) => {
					return type.rateType === NEGATIVE
				})
				return {name: '不满意', num: badArr.length}
			}
		},
		created () {
			this.$http.get('api/ratings').then((resp) => {
				if (resp.data.errorNum === ERR_OK) {
					this.ratings = resp.data.data
				}
			})
		},
		filters: {
			formatDate (time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		components: {
			Star,
			Split,
			RatingSelect,
			Scroll
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/index'
	.ratings-container{
		position: fixed
		top: 175px
		bottom: 44px
		overflow: hidden
		.seller-container{
			display: flex
			padding: 18px 0
			.left{
				flex: 0 0 137px
				width: 137px
				border-right 1px solid gray(0.1)
				text-align: center
				.score{
					margin-bottom: 6px
					font-size: 24px
					color: $color-text-orange
					line-height: 28px
				}
				.name{
					margin-bottom: 8px
					font-size: 12px
					color: $color-text-black
					line-height: 12px
				}
				.rankRate{
					margin-bottom: 6px
					font-size: 10px
					color: $color-text-deepGray
					line-height: 10px
				}
			}
			.right{
				flex: 1
				padding: 0 24px
				.score-container{
					font-size: 0
					margin-bottom: 8px
					.name{
						display: inline-block
						margin-right: 12px
						font-size: 12px
						color: $color-text-black
						line-height: 18px
					}
					.star{
						display: inline-block
						margin-right: 12px
					}
					.score{
						display: inline-block
						font-size: 12px
						color: $color-text-orange
						line-height: 18px
					}
					.time{
						display: inline-block
						font-size: 12px
						color: $color-text-deepGray
						line-height: 18px
					}
					&.margin-none{
						margin: 0
					}
				}
			}
		}
		.rating-select{
			padding: 0 18px
		}
		.ratingList{
			padding: 0 18px
			border-top 2px solid gray(0.1)
			li{
				display: flex
				padding: 18px 0
				border-bottom 1px solid gray(0.1)
				.avatar{
					flex: 0 0 28px
					width: 28px
					height: 28px
					border-radius: 50%
					overflow: hidden
				}
				.details{
					flex: 1
					padding-left: 12px
					.info{
						display: flex
						justify-content: space-between
						margin-bottom: 4px
						.username{
							font-size: 10px
							color: $color-text-black
							line-height: 12px
						}
						.rateTime{
							font-size: 10px
							font-weight: 200
							color: $color-text-deepGray
							line-height: 12px
						}
					}
					.star{
						margin-bottom: 6px
						.star-container{
							display: inline-block
						}
						.time{
							font-size: 10px
							font-weight: 200
							color: $color-text-deepGray
							line-height: 12px
						}
					}
					.text{
						margin-bottom: 8px
						font-size: 12px
						color: $color-text-black
						line-height: 18px
					}
					.recommend{
						.icon-thumb_up{
							font-size: 12px
							color: rgb(0, 160, 220)
							line-height: 16px
						}
						.recommend-item{
							display: inline-block
							width: 54px
							margin-left: 8px
							padding: 0 6px
							box-sizing: border-box
							font-size: 9px
							color: $color-text-deepGray
							line-height: 16px
							overflow: hidden
							text-overflow: ellipsis
							white-space: nowrap
							border: 1px solid gray(0.1)
							border-radius: 1px
						}
					}
				}
			}
		}
	}
</style>
