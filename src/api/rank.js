import Jsonp from 'common/js/jsonp'
import { commonParams, optionParams } from 'api/config'
// import axios from 'axios'

export function getTopList () {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

	const data = Object.assign({}, {commonParams}, {
		uin: 0,
		needNewCode: 1,
		platform: 'h5'
	})

	return Jsonp(url, data, optionParams)
}

// export function getMusicList (topid) {
// 	const url = 'api/getMusicList'
// 	const data = Object.assign({}, commonParams, {
// 		topid,
//     needNewCode: 1,
//     uin: 0,
//     tpl: 3,
//     page: 'detail',
//     type: 'top',
//     platform: 'h5',
//     format: 'json'
// 	})

// 	return axios.get(url, {
// 		params: data
// 	}).then((resp) => {
// 		return Promise.resolve(resp.data)
// 	}).catch((err) => {
// 		console.log(err)
// 	})
// }

export function getMusicList (topid) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

	const data = Object.assign({}, commonParams, {
		topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
	})

	return Jsonp(url, data, optionParams)
}