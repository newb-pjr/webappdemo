const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const data = await mysql('books').select('books.*', 'logininfo.nickName').join('logininfo', 'books.openid', 'logininfo.openid').orderBy('books.id', 'desc')
  console.log(data)
  ctx.state.data = {
    list: data
  }
}
