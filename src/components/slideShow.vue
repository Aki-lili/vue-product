<template>
	<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
		<div class="slide-img">
			<a :href="slides[nowIndex].href">
				<!--图片使用动画效果，存两张图互相切换-->
				<transition name="slide-trans">
					<img v-if="isShow" :src="slides[nowIndex].src" />
				</transition>
				<transition name="slide-trans-old">
					<img v-if="!isShow" :src="slides[nowIndex].src" />
				</transition>
			</a>
		</div>
		<h2>{{slides[nowIndex].title}}</h2>
		<ul class="slide-pages">
			<li @click="goto(prevIndex)">&lt;</li>
			<li v-for="(item,index) in slides" @click="goto(index)">
				<a :class="{on : index === nowIndex}">{{index + 1}}</a>
			</li>
			<li @click="goto(nextIndex)">&gt;</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			slides: {
				type: Array,
				default: []
			},
			inv: {
				type: Number,
				default: 2000
			}
		},
		data() {
			return {
				nowIndex: 0,
				isShow: true
			}
		},
		computed: {
			prevIndex() {
				if(this.nowIndex === 0) {
					return this.slides.length - 1
				} else {
					return this.nowIndex - 1
				}
			},
			nextIndex() {
				if(this.nowIndex === this.slides.length - 1) {
					return 0
				} else {
					return this.nowIndex + 1
				}
			}
		},
		methods: {
//			图片切换动画效果
			goto(index) {
				this.isShow = false;
				setTimeout(() => {
					this.isShow = true;
					this.nowIndex = index;
					this.$emit('on-change',index)//this.$emit触发当前实例上的事件，参数也会随之传给调用此组件的页面
				}, 10)
			},
//			开始定时器
			runInv() {
				this.Interval = setInterval(() => {
					this.goto(this.nextIndex)
				}, this.inv)
			},
//			关闭定时器
			clearInv() {
				clearInterval(this.Interval)
			}

		},
		mounted() {
//			定时器执行必须要在mounted里定义
			this.runInv();
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
	
	.on {
		color: red;
		text-decoration: none;
	}
</style>