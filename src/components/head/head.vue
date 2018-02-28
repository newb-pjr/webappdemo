<template>
	<div>
		<img :src="seller.avatar" width="64" height="64">
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		seller: {
			type: Object,
			default () {
				return {}
			}
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
