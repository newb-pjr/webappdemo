<template>
	<div class="chooser-component">
        <ul class="chooser-list">
          <li v-for="(item,index) in dataList" @click="select(item,index)" :class="{'active':index===activeIndex}">{{item.label}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
	props: {
		dataList: {
			type: Array,
			default: [{
				label: '',
				value: 0
			}]
		}
	},
	data () {
		return {
			activeIndex: 0
		}
	},
	methods: {
		select (obj,idx) {
			this.activeIndex = idx
			this.$emit('on-chooser',obj)
		}
	}
}
</script>
<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>