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
  toPage(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },

})