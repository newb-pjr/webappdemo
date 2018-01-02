import { commonParams } from 'api/config'
import axios from 'axios'

export function getLyric (mid) {
	const url = 'api/getLyric'
    const data = Object.assign({}, commonParams, {
        songmid: mid,
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		categoryId: 10000000,
		pcachetime: +new Date(),
		format: 'json'
    })

    return axios.get(url, {
		params: data
    }).then((resp) => {
		return Promise.resolve(resp.data)
    })
}