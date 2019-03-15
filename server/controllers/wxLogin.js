const axios = require('axios')

module.exports = async (ctx) => {
  let code = ctx.request.body.code
  ctx.state.data = code
  const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdd0a89f51472674a&secret=6594c6fb23e37eeac4617d2ccc35b548&js_code=' + code + '&grant_type=authorization_code'
}

function getJson (url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((resp) => {
      resolve(resp)
    })
  })
}
