let vendor = (() => {
	let createStyle = document.createElement('div').style
	let styleTransform = {
		webkit: 'webkitTransform',
		moz: 'mozTransform',
		o: 'oTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for (let key in styleTransform) {
		if(createStyle[styleTransform[key]] !== undefined) {
			return key
		}
	}
	return false
})()

export function prefixStyle (style) {
	if (!vendor) {
		return
	}
	if (vendor === 'standard') {
		return style
	}
	return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}