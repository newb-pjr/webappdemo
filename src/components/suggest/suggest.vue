<template>
	<scroll ref="suggest" class="suggest" :data="result" :pull-up="pullUp" @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getResultText(item)"></p>
        </div>
      </li>
    	<loading title="" v-show="hasMore"></loading>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
	import { search } from 'api/search'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	
	const TYPR_SINGER = 'singer'
	const perpage = 20

	export default {
		data () {
			return {
				page: 1,
				result: [],
				pullUp: true,
				hasMore: true
			}
		},
		props: {
			query: {
				type: String,
				default: ''
			},
			zhida: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			searchMore () {
				if (!this.hasMore) {
					return
				}
				this.page++
				search(this.page, this.query, this.zhida, perpage).then((resp) => {
					if (resp.code === ERR_OK) {
						this.result = [...this.result, ...this._genResult(resp.data)]
						this._checkMore(resp.data)
					}
				})
			},
			getIconCls (item) {
				if (item.type === TYPR_SINGER) {
					return 'icon-mine'
				} else {
					return 'icon-music'
				}
			},
			getResultText (item) {
				if (item.type === TYPR_SINGER) {
					return item.singername
				} else {
					return `${item.name}-${item.singer}`
				}
			},
			_genResult (result) {
				let ret = []
				if (this.page === 1) {
					if (result.zhida && result.zhida.singerid) {
						ret.push({...result.zhida, ...{type: TYPR_SINGER}})
					}
				}
				if (result.song) {
					let list = this._normalize(result.song.list)
					ret = [...ret, ...list]
				}
				return ret
			},
			_checkMore (result) {
				if (!result.song.list.length || (result.song.curnum + result.song.curpage * perpage >= result.song.totalnum)) {
					this.hasMore = false
				}
			},
			_normalize (list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.songid && musicData.albumid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		watch: {
			query (newQuery) {
				this.page = 1
				this.hasMore = true
				this.$refs.suggest.scrollTo(0, 0)
				search(this.page, newQuery, this.zhida, perpage).then((resp) => {
					if (resp.code === ERR_OK) {
						this.result = this._genResult(resp.data)
						this._checkMore(resp.data)
					}
				})
			}
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>