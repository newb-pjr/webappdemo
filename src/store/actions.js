import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

function findIndex (list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export function randomSong ({commit, state}, {list}) {
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

	let currentSIndex = findIndex(sequenceList, currentSong)
	let fsIndex = findIndex(sequenceList, song)
	sequenceList.splice(currentSIndex + 1, 0, song)

	if (fsIndex > -1) {
		if (fsIndex < currentSIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fsIndex + 1, 0)
		}
	}

	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_PLAYLIST, playList)
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_PLAYING_STATE, true)
}