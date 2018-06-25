var app = getApp()
const uri = app.globalData.uri;
Page({
  data: {
    userInfo: {},
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.pro.request({
          url: uri + 'User/getUserinfo',
          data: {
            token: that.data.token
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          that.setData({
            userInfo: res.data.data.userinfo
          })
        })
      }
    })
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  todind() {
    wx.navigateTo({
      url: '/pages/my/indent/indent'
    })
  },
  todizhi() {
    wx.navigateTo({
      url: '/pages/shop/site/site'
    })
  },
  toyijian() {
    wx.navigateTo({
      url: '/pages/pinglun/pinglun'
    })
  },
  toInfo() {
    wx.navigateTo({
      url: '/pages/my/info/info'
    })
  },
  toqianbao() {
    wx.navigateTo({
      url: '/pages/my/wallet/wallet'
    })
  },
  toyhq() {
    wx.navigateTo({
      url: '/pages/my/card/card'
    })
  },
  tohongb() {
    wx.navigateTo({
      url: '/pages/my/hongb/hongb'
    })
  },

})