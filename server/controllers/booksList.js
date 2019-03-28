const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const size = 8
  const {page} = ctx.request.query
  const data = await mysql('books').select('books.*', 'logininfo.nickName').join('logininfo', 'books.openid', 'logininfo.openid').limit(size).offset(Number(page) * size).orderBy('books.id', 'desc')
  ctx.state.data = {
    list: data
  }
}
