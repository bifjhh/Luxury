//app.js
import './utils/WxPromise'
const uri = 'https://api.shewuwang.com/api/';
let token;
App({
  onLaunch: function () {
    let that = this;
    wx.$http = that.http;

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
          if (!wx.getStorageSync('token')) {
            console.log('但是没有token')
            wx.reLaunch({
              url: '/pages/user/index'
            })
          }
        }
      }
    })
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    })

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
          if (res.data.code == 500 || res.data.code == 0 && res.statusCode !== 200) {
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
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
          reject(error);
        },
      })
    });
    return promise;
  },
  globalData: {
    userInfo: null,
    isIphoneX: false,
    uri: 'https://api.shewuwang.com/api/',
  }
})