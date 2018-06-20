//app.js
 import './utils/WxPromise'
App({
  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
         wx.getUserInfo({
           success: res => {
             // 可以将 res 发送给后台解码出 unionId
             that.globalData.userInfo = true;
             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
             // 所以此处加入 callback 以防止这种情况
             if (this.userInfoReadyCallback) {
               this.userInfoReadyCallback(res)
             }
           }
         })
        }else{
          wx.reLaunch({
            url: '/pages/user/index'
          })
        }
      }
    })
  },
   getUserInfo: function (cb) {
     var that = this
     if (this.globalData.userInfo) {
       typeof cb == "function" && cb(this.globalData.userInfo)
     } else {
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
     }
   },
   getHttp(){
     
   },
  globalData: {
    userInfo: null,
    uri: 'http://116.62.142.20:86/api/'
  }
})