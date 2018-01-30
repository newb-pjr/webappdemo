import Jsonp from 'common/js/jsonp'
import { commonParams, optionParams } from 'api/config'
import axios from 'axios'
export function getRecommend () {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return Jsonp(url, data, optionParams)
}

export function getDiscList () {
	// const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		rnd: Math.random(),
		format: 'json'
	})
	return axios.get('api/getDiscList', {
		params: data
	}).then((resp) => {
		return new Promise((resolve, reject) => {
			resolve(resp.data)
		})
	}).catch((err) => {
		console.log(err)
	})

	// return Jsonp(url, data, optionParams)
}

export function getSongList (disstid) {
	const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
	const data = Object.assign({}, commonParams, {
		disstid,
		type: 1,
		json: 1,
		utf8: 1,
		onlysong: 0,
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0
	})
	// return axios.get(url, {
	// 	params: data
	// }).then((resp) => {
	// 	return Promise.resolve(resp.data)
	// }).catch((err) => {
	// 	console.log(err)
	// })
    return Jsonp(url, data, optionParams)
}