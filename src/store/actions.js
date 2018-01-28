import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, delectSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'

function findIndex (list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export function randomSong ({commit, state}, {list}) {
	console.log(list)
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST, randomList)
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_CURRENT_INDEX, 0)
	commit(types.SET_PLAYING_STATE, true)
}

export function selectSong ({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	if (state.mode === playMode.random) {
		let randomList = shuffle(list)
		index = findIndex(randomList, list[index])
		commit(types.SET_PLAYLIST, randomList)
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_PLAYING_STATE, true)
}

export function insertSong ({commit, state}, song) {
	let playList = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex

	let currentSong = playList[currentIndex]
	let fpIndex = findIndex(playList, song)
	currentIndex++
	playList.splice(currentIndex, 0, song)
	if (fpIndex > -1) {
		if (fpIndex < currentIndex) {
			playList.splice(fpIndex, 1)
			currentIndex--
		} else {
			playList.splice(fpIndex + 1, 1)
		}
	}

	let currentSIndex = findIndex(sequenceList, currentSong) + 1
	let fsIndex = findIndex(sequenceList, song)
	sequenceList.splice(currentSIndex, 0, song)

	if (fsIndex > -1) {
		if (fsIndex < currentSIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}

	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_PLAYLIST, playList)
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_PLAYING_STATE, true)
}

export function saveSearchHistory ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export function delectSearchHistory ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, delectSearch(query))
}

export function clearSearchHistory ({commit}) {
	commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export function deleteSong ({commit, state}, song) {
	let playList = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex

	let pIndex = findIndex(playList, song)
	playList.splice(pIndex, 1)
	let sIndex = findIndex(sequenceList, song)
	sequenceList.splice(sIndex, 1)

	if (pIndex < currentIndex || currentIndex === playList.length) {
		currentIndex--
	}

	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_PLAYLIST, playList)
	commit(types.SET_CURRENT_INDEX, currentIndex)

	if (!playList.length) {
		commit(types.SET_PLAYING_STATE, false)
	} else {
		commit(types.SET_PLAYING_STATE, true)
	}
}

export function clearPlayList ({commit}) {
	commit(types.SET_SEQUENCE_LIST, [])
	commit(types.SET_PLAYLIST, [])
	commit(types.SET_CURRENT_INDEX, -1)
	commit(types.SET_PLAYING_STATE, false)
}

export function savePlayHistory ({commit}, song) {
	commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export function saveFavoriteList ({commit}, song) {
	commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export function deleteFavoriteList ({commit}, song) {
	commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
