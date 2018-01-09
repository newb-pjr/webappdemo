<template>
	<div ref="suggest" class="suggest" >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getResultText(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
	import { search } from 'api/search'
	import { ERR_OK } from 'api/config'
	import { filterSinger } from 'common/js/song'
	
	const TYPR_SINGER = 'singer'

	export default {
		data () {
			return {
				page: 1,
				result: []
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
					return `${item.songname}-${filterSinger(item.singer)}`
				}
			},
			_genResult (result) {
				let ret = []
				if (result.zhida && result.zhida.singerid) {
					ret.push({...result.zhida, ...{type: TYPR_SINGER}})
				}
				if (result.song) {
					ret = [...ret, ...result.song.list]
				}
				return ret
			}
		},
		watch: {
			query (newQuery) {
				search(this.page, newQuery, this.zhida).then((resp) => {
					if (resp.code === ERR_OK) {
						this.result = this._genResult(resp.data)
					}
				})
			}
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