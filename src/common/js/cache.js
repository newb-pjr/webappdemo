import storage from 'good-storage'

const MAX_SAVE_LENGTH = 15
const SAVE_NAME = '__search__'

function insertArray (arr, val, compare, maxLen) {
	const index = arr.findIndex(compare)
	if (index === 0) {
		return
	}
	if (index > 0) {
		arr.splice(index, 1)
	}
	arr.unshift(val)
	if (maxLen && arr.length > maxLen) {
		arr.pop()
	}
}

function delectInsertArray (arr, compare) {
	const index = arr.findIndex(compare)

	if (index > -1) {
		arr.splice(index, 1)
	}
}

export function saveSearch (query) {
	let searches = storage.get(SAVE_NAME, [])
	insertArray(searches, query, (item) => {
		return item === query
	}, MAX_SAVE_LENGTH)
	storage.set(SAVE_NAME, searches)
	return searches
}

export function loadSearch () {
	return storage.get(SAVE_NAME, [])
}

export function delectSearch (query) {
	let searches = storage.get(SAVE_NAME, [])
	delectInsertArray(searches, (item) => {
		return item === query
	})
	storage.set(SAVE_NAME, searches)
	return searches
}

export function clearSearch () {
	storage.remove(SAVE_NAME)
	return []
}