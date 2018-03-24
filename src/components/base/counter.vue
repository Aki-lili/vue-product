<template>
	<div class="counter-component">
		<div class="counter-btn" @click="minus" > - </div>
		<div class="counter-show">
			<input type="text" v-model="number" @keyup="fixNumber"/>
		</div>
		<div class="counter-btn" @click="add"> + </div>
	</div>
</template>

<script>
	export default {
//		props里面可定义...
		props: {
			max: {
				type: Number,
				default: 5
			},
			min: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				number: this.min
			}
		},
		watch: {
//			number属性三个地方都可修改， 直接在watch里监听number的变化
			number() {
				this.$emit('on-change', this.number);
			}
		},
		methods: {
			
			fixNumber() {
				let fix
				if(typeof this.number !== 'number') {
//					如果不是数字replace替换为空
					fix = Number(this.number.replace(/\D/g, ''));
				} else {
					fix = this.min;
				}
				if(fix < this.min || fix > this.max) {
					fix = this.min;
				}
				this.number = fix;
			},
			minus() {
				
				if(this.number <= this.min) {
					return
				}
				this.number--
			},
			add() {
				if(this.number >= this.max) {
					return
				}
				this.number++
			}
		}
	}
</script>

<style scoped>
	.counter-component {
		position: relative;
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;
	}
	
	.counter-show {
		float: left;
	}
	
	.counter-show input {
		text-align: center;
		border: none;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		height: 23px;
		line-height: 23px;
		width: 30px;
		outline: none;
		text-indent: 4px;
	}
	
	.counter-btn {
		border: 1px solid #e3e3e3;
		float: left;
		height: 25px;
		line-height: 25px;
		width: 25px;
		text-align: center;
		cursor: pointer;
	}
	
	.counter-btn:hover {
		border-color: #4fc08d;
		background: #4fc08d;
		color: #fff;
	}
	
	.counter-btn-disabled{
		border-color: #B2B2B2;
		background: #B2B2B2;
		color: #000;
	}
</style>