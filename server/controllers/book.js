const axios = require('axios')
module.exports = async (ctx) => {
  const isbn = ctx.request.body.isbn
  const data = await getBook(isbn)
  const rate = data.rating.average
  const {title, image, alt, publisher, summary, price} = data
  const tags = data.tags.map(v => `${v.title} ${v.count}`).join()
  const author = data.author.join()
  ctx.state.data = {rate, tags, author, title, image, alt, publisher, summary, price}
}

function getBook (isbn) {
  return new Promise((resolve, reject) => {
    let url = `https://douban.uieee.com/v2/book/isbn/${isbn}`

    axios.get(url).then((resp) => {
      resolve(resp.data)
    })
  })
}
