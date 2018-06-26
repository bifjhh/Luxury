// pages/my/info/name/name.js
const app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
        that.getUserInfo(that, {});
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getName(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      name: e.detail.value
    })
  },
  submit() {
    let that = this;
    // let pages = getCurrentPages();
    // let prevPage = pages[pages.length - 2]
    // console.log(prevPage.data.name)
    // prevPage.setData({
    //   name: that.data.name
    // })
    that.setUserInfo(that, {
      nickname: that.data.name
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 200)
  },
  getUserInfo(that, data) {
    data.token = that.data.token
    wx.pro.request({
      url: uri + 'User/getUserinfo',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.setData({
        userInfo: res.data.data.userinfo
      })
    })
  },
  setUserInfo(that, data) {
    data.token = that.data.token
    wx.pro.request({
      url: uri + 'User/profile',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.getUserInfo(that, {
        token: that.data.token
      })
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})