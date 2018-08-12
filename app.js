//app.js
import './utils/WxPromise'
const uri = 'https://api.shewuwang.com/api/';
let token;
App({
  onLaunch: function () {
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          console.log('没有授权授权')
          wx.reLaunch({
            url: '/pages/user/index'
          })
        } else {
          console.log('已经授权')
        }
      }
    })
    wx.$http = that.http;

  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  http(url, data) {
    let token = wx.getStorageSync('token')
    url = uri + url;
    if (!data) {
      data = {}
    }
    data.token = token;
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code == 500 || res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          } else {
            resolve(res);
          }
        },
        fail: function (error) {
          console.log('error', error)
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'none',
          //   duration: 1000
          // })
          reject(error);
        },
      })
    });
    return promise;
  },
  globalData: {
    userInfo: null,
    uri: 'http://api.shewuwang.com/api/',
  }
})