var app = getApp()
const uri = app.globalData.uri;
Page({
  data: {
    userInfo: {},
  },

  onLoad() {
    let that = this
    //调用应用实例的方法获取全局数据
  },
  onShow() {
    let that = this;
    that.getUserInfo(that);
  },
  getUserInfo(that) {
    wx.$http('User/getUserinfo').then(res => {
      if (res.data.code != 1) return;
      that.setData({
        userInfo: res.data.data.userinfo
      })
    })
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