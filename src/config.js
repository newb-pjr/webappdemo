const host = 'http://localhost:5757'

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  wxLoginUrl: `${host}/weapp/wxLogin`,
  bookUrl: `${host}/weapp/book`,
  booksListUrl: `${host}/weapp/booksList`
}

export default config
