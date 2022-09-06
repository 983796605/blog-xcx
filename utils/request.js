let BASE_URL;
const utils = require("./util");
const request = {
  // 初始化的一些变量
  initMethods: (data) => {
    BASE_URL = data.url; // 接口地址
  },
  get: (data) => {
    return request.request(data, 'get')
  },
  post: (data) => {
    return request.request(data, 'post')
  },
  request: (data, method) => {
      console.log(data)
    return new Promise((resolve, reject) => {
      if(data) {
        var header = {
          "Authorization": wx.getStorageSync('token'),
          "Content-Type": "application/x-www-form-urlencoded"
        }
        var url = data.url.indexOf('http') != -1 ? data.url : BASE_URL + data.url;
        wx.request({
          method,
          url,
          data: data.data,
          header: Object.assign(header, data.header ? data.header : {}),
          success: res => {
            // console.log(res)
            if(res.statusCode !== 200 || res.data.code !== 200) {
                wx.removeStorageSync('localUserInfo');
                wx.removeStorageSync('token');
                wx.removeStorageSync('wxUserInfo');
            }
            resolve(res.data)
          },
          fail: err => {
            console.log('错误', err)
            if(err.errMsg == "request:fail timeout") {
              wx.showToast({
                title: '接口请求超时，请重试~',
                icon: 'none',
                duration: 2000
              })
            }
            reject(err)
          }
        })
      } else {

      }
    })
  },
  // 上传图片/文件
  uploadFile: params => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        filePath: params.path,
        name: 'imageFile',
        url: params.url,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          let data = res.data;
          if(typeof data == 'string') {
            data = JSON.parse(data);
          }
          resolve(data)
        },
      })
    })
  }
}
module.exports = request;