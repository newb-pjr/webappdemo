import { commonParams, optionParams } from 'api/config'
import axios from 'axios'
import Jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'

export function getLyric (mid) {
	const url = '/api/getLyric'
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

  // return Jsonp(url, data, optionParams)
}

export function getVKey (songmid, filename) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

    const data = Object.assign({}, commonParams, {
      cid: 205361747,
      format: 'json',
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      uin: 0,
      songmid,
      filename,
      guid: getUid()
    })

    return Jsonp(url, data, Object.assign({}, optionParams, {
      param: 'callback'
    }))
}