const app = getApp()
const openId = app.globalData.openId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: false,
    phone: '13111111111',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
    wx.login({
      success: function (res) {
        if (!res.code) return;
        //发起网络请求
        wx.$http('Index/getOpenId', {
          code: res.code
        }).then(res => {
          if (!res.data.data.openid) {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 1500
            })
            return false
          }
          let openId = res.data.data.openid
          that.setData({
            openid: openId
          })
          wx.$http('User/thirdlogin', {
            platform: 'wx',
            openid: openId
          }).then(res => {
            if (res.data.code == 0) return;
            if (res.data.code == 100) {
              that.setData({
                mobile: true
              })
              return false;
            };
            wx.setStorageSync('token', res.data.data.userinfo.token)
            that.setData({
              mobile: !res.data.data.userinfo.mobile
            })
            if (res.data.data.userinfo.mobile) {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
          })
        })
      }
    });
  },
  submit(e) {
    let that = this;
    let data = e.detail.value;
    data.platform = 'wx';
    data.openid = that.data.openid;
    wx.$http('User/bindmobile', data).then(res => {
      if (res.data.code == 1) {
        console.log(res)
        // that.logn()
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
    wx.$http('Sms/send', {
      mobile: that.data.phone
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