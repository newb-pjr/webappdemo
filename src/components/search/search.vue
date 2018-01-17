<template>
	<div class="search">
	    <div class="search-box-wrapper">
	      <search-box ref="searchBox" @query="onQueryChange"></search-box>
	    </div>
	    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
	      <scroll ref="shortcut" class="shortcut" :data="shortcut">
        	<div>
	          <div class="hot-key">
	            <h1 class="title">热门搜索</h1>
	            <ul>
	              <li class="item" v-for="item in hotKey" @click="select(item.k)">
	                <span>{{item.k}}</span>
	              </li>
	            </ul>
	          </div>
	          <div class="search-history" v-show="searchHistory.length > 0">
	            <h1 class="title">
	              <span class="text">搜索历史</span>
	              <span class="clear" @click="delectAll">
	                <i class="icon-clear"></i>
	              </span>
	            </h1>
	            <search-list :searches="searchHistory" @select="select" @delect="delectSearchHistory"></search-list>
	          </div>
        	</div>
	      </scroll>
	    </div>
	    <div class="search-result" ref="searchResult" v-show="query">
	    	<suggest ref="suggest" :query="query" @listScroll="blurInput" @selectSaveSearch="saveSearch"></suggest>
	    </div>
	    <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="删除" @confirm="clearSearchHistory"></confirm>
	    <router-view></router-view>
	  </div>
	</div>
</template>
<script type="text/ecmascript-6">
	import SearchBox from 'base/search-box/search-box'
	import { getHotKey } from 'api/search'
	import { ERR_OK } from 'api/config'
	import Suggest from 'components/suggest/suggest'
	import { mapActions, mapGetters } from 'vuex'
	import SearchList from 'base/search-list/search-list'
	import Confirm from 'base/confirm/confirm'
	import Scroll from 'base/scroll/scroll'
	import { playListMixin } from 'common/js/mixin'

	export default {
		mixins: [playListMixin],
		data () {
			return {
				hotKey: [],
				query: ''
			}
		},
		created () {
			this._getHotKey()
		},
		computed: {
			shortcut () {
				return [...this.hotKey, ...this.searchHistory]
			},
			...mapGetters([
					'searchHistory'
				])
		},
		methods: {
			handlePlayList (playList) {
				let bottom = playList.length > 0 ? '60px' : ''
				this.$refs.shortcutWrapper.style.bottom = bottom
				this.$refs.shortcut.refresh()
				this.$refs.searchResult.style.bottom = bottom
				this.$refs.suggest.refresh()
			},
			delectAll () {
				this.$refs.confirm.show()
			},
			saveSearch () {
				this.saveSearchHistory(this.query)
			},
			blurInput () {
				this.$refs.searchBox.blur()
			},
			onQueryChange (query) {
				this.query = query
			},
			select (key) {
				this.$refs.searchBox.setQuery(key)
			},
			_getHotKey () {
				getHotKey().then((resp) => {
					if (resp.code === ERR_OK) {
						this.hotKey = resp.data.hotkey.slice(0, 10)
					}
				})
			},
			...mapActions([
					'saveSearchHistory',
					'delectSearchHistory',
					'clearSearchHistory'
				])
		},
		watch: {
			query (newQuery) {
				if (!newQuery) {
					setTimeout(() => {
						this.$refs.shortcut.refresh()
					}, 20)
				}
			}
		},
		components: {
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
