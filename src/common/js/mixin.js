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
