<template>
	<transition-group name="list" tag="ul" class="search-list">
      <li class="search-item" :key="item" v-for="item in searches" @click="selectItem(item)">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="delect(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
  </transition-group>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			searches: {
				type: Array,
				default: []
			}
		},
		methods: {
			selectItem (item) {
				this.$emit('select', item)
			},
			delect (item) {
				this.$emit('delect', item)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.search-list
	  .search-item
	    display: flex
	    align-items: center
	    height: 40px
	    overflow: hidden
	    &.list-enter-active, &.list-leave-active
	      transition: all 0.1s
	    &.list-enter, &.list-leave-to
	      height: 0
	    .text
	      flex: 1
	      color: $color-text-l
	    .icon
	      extend-click()
	      .icon-delete
	        font-size: $font-size-small
	        color: $color-text-d
</style>