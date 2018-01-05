import Jsonp from 'common/js/jsonp'
import { commonParams, optionParams } from 'api/config'

export function getTopList () {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

	const data = Object.assign({}, {commonParams}, {
		uin: 0,
		needNewCode: 1,
		platform: 'h5'
	})

	return Jsonp(url, data, optionParams)
}