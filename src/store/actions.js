import * as types from './mutation-types'

export function selectSong ({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	commit(types.SET_PLAYLIST, list)
	commit(types.SET_FULLSCREEN, true)
	commit(types.SET_CURRENT_INDEX, index)
}