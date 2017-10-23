<template>
	 <div class="chooser-component">
        <ul class="chooser-list">
        	<li v-for="(item,index) in multiplyChooserData" @click="multiply(index)" :class="{active:toggleShow(index)}">{{item.label}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
	props: {
		multiplyChooserData: {
			type: Array,
			default: [{
				label: '',
				value: 0
			}]
		}
	},
	data () {
		return {
			multiplyData: new Set(),
			index: false
			// nowIndexes: [0],
			// asd: false
		}
	},
	methods: {
		multiply (idx) {
			if(this.multiplyData.has(idx)){
				this.multiplyData.delete(idx)
			}else{
				this.multiplyData.add(idx)
			}
			// this.index = !this.index
		},
		toggleShow (idx) {
			console.log(this.multiplyData)
			if(this.multiplyData.has(idx)){
				return this.index = true
			}else{
				return this.index = false

			}
		}
	// 	toggleSelection (index) {
 //      if (this.nowIndexes.indexOf(index) === -1) {
 //        this.nowIndexes.push(index)  
 //      }
 //      else {
 //        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
 //          return idx !== index
 //        })
 //      }
     
 //    },
 //    checkActive (index) {
 //      return this.nowIndexes.indexOf(index) !== -1
 //    }
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