<template>
	<div class="recommend">
		<scroll :data="discList" class="recommend-content" ref="scroll">
			<div>
				<ic-Slider :autoplay="3000">
					<ic-slider-item v-for="(item,index) in sliderData" key="index">
						<a :href="item.linkUrl">
							<img @load="imgLoad()" :src="item.picUrl">
						</a>
					</ic-slider-item>
				</ic-Slider>
				<div class="recommend-list">
		      <h1 class="list-title">热门歌单推荐</h1>
		      <ul>
		        <li v-for="(item,index) in discList" key="index" class="item">
		          <div class="icon">
		            <img width="60" height="60" v-lazy="item.imgurl">
		          </div>
		          <div class="text">
		            <h2 class="name">{{item.creator.name}}</h2>
		            <p class="desc">{{item.dissname}}</p>
		          </div>
		        </li>
		      </ul>
		    </div>
			</div>
	    <div class="loading-container" v-show="!discList.length">
	    	<loading></loading>
	    </div>
		</scroll>
	</div>
</template>
<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {IcSlider, IcSliderItem} from 'vue-better-slider'
import 'vue-better-slider/style.css'
export default {
data () {
	return {
		sliderData: [],
		discList: []
	}
},
components: {
	IcSlider,
	IcSliderItem,
	Scroll,
	Loading
},
created () {
  this._getRecommend()
  setTimeout(() => {
  this._getDiscList()
  }, 2000)
},
methods: {
  _getRecommend () {
    getRecommend().then((resp) => {
      if (resp.code === ERR_OK) {
        this.sliderData = resp.data.slider
        console.log(resp.data.slider)
      }
    })
  },
  _getDiscList () {
    getDiscList().then((resp) => {
      if (resp.code === ERR_OK) {
        this.discList = resp.data.list
        // console.log(resp.data.list)
      }
    })
  },
  imgLoad () {
 if (!this.checkLoaded) {
 this.$refs.scroll.refresh()
 this.checkLoaded = true
 }
  }
}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
		.recommend-list
		  .list-title
		    height: 65px
		    line-height: 65px
		    text-align: center
		    font-size: $font-size-medium
		    color: $color-theme
		  .item
		    display: flex
		    box-sizing: border-box
		    align-items: center
		    padding: 0 20px 20px 20px
		    .icon
		      flex: 0 0 60px
		      width: 60px
		      padding-right: 20px
		    .text
		      display: flex
		      flex-direction: column
		      justify-content: center
		      flex: 1
		      line-height: 20px
		      overflow: hidden
		      font-size: $font-size-medium
		      .name
		        margin-bottom: 10px
		        color: $color-text
		      .desc
		        color: $color-text-d
	  .loading-container
	    position: absolute
	    width: 100%
	    top: 50%
	    transform: translateY(-50%)        
</style>
