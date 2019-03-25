export function get (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: 'GET',
      success: res => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          wx.showToast({
            title: res.data.data.msg,
            icon: 'none'
          })
        }
      }
    })
  })
}

export function post (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: 'POST',
      success: res => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          wx.showToast({
            title: res.data.data.msg,
            icon: 'none'
          })
        }
      }
    })
  })
}

export function showToast (title) {
  wx.showToast({
    title
  })
}
