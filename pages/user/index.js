const app = getApp()
const uri = app.globalData.uri;
const openId = app.globalData.openId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindPhone: false,
    phone: '13111111111'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
      }
    })
  },

  /**
   * 用户登录允许授权后执行的方法
   */
  logn() {
    let that = this;
    let data = {
      openid: openId,
      platform: 'wx'
    }
    wx.pro.request({
      url: uri + 'User/thirdlogin',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code == 1) {
        wx.setStorage({
          key: "token",
          data: res.data.data.userinfo.token
        })
      }
    })
    that.setData({
      bindPhone: true
    })

  },
  submit(e) {
    let that = this;
    let data = e.detail.value;
    data.platform = 'wx';
    data.openid = openId;
    wx.pro.request({
      url: uri + 'User/bindmobile',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code == 1) {
        console.log(res)
        that.logn()
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    })

  },
  input(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCode() {
    let that = this;
    let isCode = wx.pro.match('phoneNumber', that.data.phone);
    if (!isCode) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    console.log(uri)
    wx.pro.request({
      url: uri + 'Sms/send',
      data: {
        mobile: that.data.phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log()
      if (res.data.code) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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