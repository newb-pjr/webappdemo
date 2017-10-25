<template>
	<div>
	    <check-dialog>
	    	请检查你的支付状态！
		      <div class="button" >
		        支付成功
		      </div>
		      <div class="button" >
		        支付失败
		      </div>
	    </check-dialog>
	</div>
</template>
<script>
import dialog from './base/dialog'
export default {
	components:{
		checkDialog: dialog
	}
}
</script>
<style scoped>
	
</style>