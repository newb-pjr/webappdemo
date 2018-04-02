export function formatDate (date, format) {
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').subStr(4 - RegExp.$1.length))
	}

	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'm+': date.getMinutes()
	}

	for (let k in o) {
		if (new RegExp(`(${k})`).test(format)) {
			let str = o[k] + ''
			format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padleftZore(str)
		}
	}
}

function padleftZore (str) {
	return '00' + str.subStr(str.length)
}