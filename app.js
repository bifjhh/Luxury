//app.js
import './utils/WxPromise'
const uri = 'http://api.shewuwang.com/api/';
let token;
App({
  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    token = wx.getStorageSync('token')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
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
    url = uri + url;
    if (!data) {
      data = {}
    }
    console.log(token)
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
          resolve(res);
        },
        fail: function (error) {
          reject(error);
        },
      })
    });
    return promise;
  },
  globalData: {
    userInfo: null,
    uri: 'http://api.shewuwang.com/api/',
    openId: 'wx942a74c19e682464',
    token: '0ccdcd90-72db-4bde-b1c2-5a1f17e44522',
  }
})