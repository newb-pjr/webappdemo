export function formatDate (date, format) {
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').subStr(4 - RegExp.$1.length))
	}
}