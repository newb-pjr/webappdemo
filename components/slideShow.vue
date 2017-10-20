<template>
	<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[slideIndex].href">
      	 <transition name="slide-trans">
          <img v-if="isShow" :src="slides[slideIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[slideIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{slides[slideIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="choose(prev)">&lt;</li>
      <li v-for="(item,index) in slides" @click="choose(index)">
        <a :class="{'on':index===slideIndex}">{{index+1}}</a>
      </li>
      <li @click="choose(next)">&gt;</li>
    </ul>
  </div>
</template>
<script>
export default {
	props:{
		slides:{
			type: Array,
			default: []
		},
		invTime:{
			type: Number,
			default: 1000
		}
	},
	data () {
		return {
			slideIndex: 0,
			isShow: true
		}
	},
	computed: {
		prev () {
			if(this.slideIndex === 0){
				return this.slides.length - 1
			}else{
				return this.slideIndex - 1
			}
		},
		next () {
			if(this.slideIndex === this.slides.length - 1){
				return 0
			}else{
				return this.slideIndex + 1
			}
		}
	},
	methods:{
		choose (index) {
			this.isShow = false
			setTimeout(() => {
				this.isShow = true
				this.slideIndex = index
			}, 10);
		},
		runInv () {
			this.inv = setInterval(()=>{
				this.choose(this.next)
			}, this.invTime)
		},
		clearInv () {
			clearInterval(this.inv)
		}
	},
	mounted () {
		this.runInv()
	}
}
</script>
<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>