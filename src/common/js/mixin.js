export const typePicMixin = {
	methods: {
		typePic (index) {
			let cls
			switch (index) {
				case 0:
					cls = 'decrease'
					break
				case 1:
					cls = 'discount'
					break
				case 2:
					cls = 'special'
					break
				case 3:
					cls = 'invoice'
					break
				case 4:
					cls = 'guarantee'
					break
			}
			return cls
		}
	}
}

export const ratingMixin = {
	data () {
		return {
			commentType: 2,
			hasOnlyComment: false
		}
	},
	methods: {
		onSelect (type) {
			this.commentType = type
		},
		showComment (text, rateType) {
			if (this.hasOnlyComment && !text) {
				return false
			}
			if (this.commentType === 2) {
				return true
			} else {
				return this.commentType === rateType
			}
		},
		hasContChange (flag) {
			this.hasOnlyComment = flag
		}
	}
}
