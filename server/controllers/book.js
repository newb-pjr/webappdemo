const axios = require('axios')
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
  const openid = ctx.request.body.openid
  const isbn = ctx.request.body.isbn
  if (openid && isbn) {
    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      }
      return
    }
    const data = await getBook(isbn)
    const rate = data.rating.average
    const {title, image, alt, publisher, summary, price} = data
    const tags = data.tags.map(v => `${v.title} ${v.count}`).join()
    const author = data.author.join()
    try {
      await mysql('books').insert({openid, isbn, rate, tags, author, title, image, alt, publisher, summary, price})
      ctx.state.data = {
        title,
        msg: 'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '新增失败：' + e.sqlMessage
        }
      }
    }
  }
}

function getBook (isbn) {
  return new Promise((resolve, reject) => {
    let url = `https://douban.uieee.com/v2/book/isbn/${isbn}`

    axios.get(url).then((resp) => {
      resolve(resp.data)
    })
  })
}
