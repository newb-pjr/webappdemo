export function post (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: 'POST',
      success: res => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        }
      }
    })
  })
}
