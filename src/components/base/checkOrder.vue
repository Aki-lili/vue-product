<template>
	<div>
		<!--第二个模态框-->
		<this-dialog :isShow="isShowCheckDialog"  @on-close="checkStatus">
			请检查你的支付状态！<br /><br />
			<div class="button" @click="checkStatus">
				支付成功
			</div>
			<div class="button" @click="checkStatus">
				支付失败！
			</div>
		</this-dialog>
		<!--购买成功是第三个模态框-->
		<this-dialog :isShow="isShowSuccessDialog" @on-close="toOrderList">
			购买成功！
		</this-dialog>
		<!--购买失败是第三个模态框-->
		<this-dialog :isShow="isShowFailDialog" @on-close="toOrderList">
			购买失败！
		</this-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	import Dialog from '../base/dialog'
	export default {
		props:{
//			isShowCheckDialog是父级传过来的，所以只能去父级修改，所以在checkStatus方法里面使用了this.$emit传了一个事件
			isShowCheckDialog:{
				type:Boolean,
				default:false
			}
		},
		orderId:{
			type:[Number,String]
		},
		components:{
			thisDialog:Dialog
		},
		data() {
			return {
				isShowSuccessDialog:false,
				isShowFailDialog:false,
				disbaled:false
			}
		},
		methods:{
			checkStatus(){
				axios.get('/static/db.json', {orderId:this.orderId})
				.then((res) =>{
					this.isShowSuccessDialog = true;
					this.$emit('is-close-check-dialog');
				},(error) =>{
					this.isShowFailDialog = true;
					console.log(error)
					this.$emit('is-close-check-dialog');
				});
			},
			toOrderList(){
//				vue自带的路由跳转方法 this.$router
				this.isShowSuccessDialog = false;
				this.$router.push({path:"/orderList"})
			}
		}
	}
</script>

<style scoped>

</style>