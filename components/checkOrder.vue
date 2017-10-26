<template>
	<div>
	    <check-dialog :dialog-show="isShowCheckOrder" @close-dialog="checkOrderStatus">
	    	请检查你的支付状态！
		      <div class="button" @click="checkOrderStatus">
		        支付成功
		      </div>
		      <div class="button" @click="checkOrderStatus">
		        支付失败
		      </div>
	    </check-dialog>
	    <check-dialog :dialog-show="isShowSuccessDialog" @close-dialog="closeDialog('isShowSuccessDialog')">
	      购买成功！
	    </check-dialog>
	    <check-dialog :dialog-show="isShowFailDialog" @close-dialog="closeDialog('isShowFailDialog')">
	      购买失败！
	    </check-dialog>
	</div>
</template>
<script>
import dialog from './base/dialog'
export default {
	components:{
		checkDialog: dialog
	},
	props:{
		isShowCheckOrder: {
			type: Boolean,
			default: false
		},
		orderId: [String,Number]
	},
	data () {
		return {
			isShowSuccessDialog: false,
			isShowFailDialog: false,
		}
	},
	methods: {
		closeDialog (attr) {
			this[attr] = false
		},
		checkOrderStatus () {
			this.$http.post('../api/checkOrder',{
				orderId: this.orderId
			}).then((resp)=>{
				this.isShowSuccessDialog = true
				this.$emit('on-close-check-dialog')
			},(err)=>{
				this.isShowFailDialog = true
				this.$emit('on-close-check-dialog')
			})
		}
	}
}
</script>
<style scoped>
	
</style>