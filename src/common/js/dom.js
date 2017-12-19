export function getData (el, name, val) {
	const prefix = 'data-'
	name = prefix + name
	if (val) {
		return el.setAttribute(name, val)
	} else {
		return el.getAttribute(name)
	}
}

let vendor = (() => {
	let createStyle = document.createElement('div').style
	let styleTransform = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'maTransform',
		standard: 'transform'
	}

	for (let key in styleTransform) {
		if (createStyle[styleTransform[key]] !== undefined) {
			return key
		}
	}

	return false
})()

export function prefixStyle (style) {
	if (vendor === false) {
		return false
	}
	if (vendor === 'standard') {
		return style
	}
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}