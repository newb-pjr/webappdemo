const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const data = await mysql('books').select('*')
  console.log(data)
  ctx.state.data = {
    list: data
  }
}
