<template>
	<div class="chooser-component">
		<div class="chooser-list">
			<ul>
				<!--chooser是父组件传过来的数据，在props里面定义chooser的类型及默认值-->
				<li v-for="(item,index) in chooser" :class="{active : index === nowIndex}" @click="toggleSelection(index)">{{item.label}}</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			chooser: {
				type: Array,
				default: [{
					label: 'test',
					value: 0
				}]
			}
		},
		data() {
			return {
				nowIndex: 0
			}
		},
		methods: {
			toggleSelection(index) {
				this.nowIndex = index;
				//console.log(this.chooser)// (3) [Object, Object, Object, __ob__: Observer]
				this.$emit('on-change',this.chooser[index])
			}
		}
	}
</script>

<style scoped>
	.chooser-component {
		position: relative;
		display: inline-block;
	}
	
	.chooser-list li {
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