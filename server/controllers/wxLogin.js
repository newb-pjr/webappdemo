const axios = require('axios')
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  let {code, avatarUrl, city, country, gender, language, nickName, province} = ctx.request.body
  const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdd0a89f51472674a&secret=6594c6fb23e37eeac4617d2ccc35b548&js_code=' + code + '&grant_type=authorization_code'
  let data = await getJson(url)
  ctx.state.data = data
  if (code && data.openid) {
    const findRes = await mysql('logininfo').select().where('openid', data.openid)
    if (findRes.length) {
      return
    }
    try {
      await mysql('logininfo').insert({openid: data.openid, avatarUrl, city, country, gender, language, nickName, province})
      ctx.state.data = {
        msg: 'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '登陆失败' + e.sqlMessage
        }
      }
    }
  }
}

function getJson (url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((resp) => {
      resolve(resp.data)
    })
  })
}
