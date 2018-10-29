const app = getApp()
const openId = app.globalData.openId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: false,
    phone: '',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // console.log(app.globalData.userInfo)
    that.getOpenid().then(res => {
      that.setData({
        openid: res
      })
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('授权');
          that.setData({
            mobile: true
          })
        }
      }
    })
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res.userInfo)
    //   }
    // })
  },
  getOpenid() {
    let promise = new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (!res.code) return;
          wx.$http('Index/getOpenId', {
            code: res.code
          }).then(resopens => {
            if (!resopens.data.data.openid) {
              reject(resopens);
              return false;
            };
            resolve(resopens.data.data.openid);
          })
        }
      });
    })
    return promise;
  },
  /**
   * 用户登录允许授权后执行的方法
   */
  logn() {
    let that = this;
    console.log('ididid',that.data.openid)
    wx.$http('User/thirdlogin', {
      platform: 'wxxcx',
      openid: that.data.openid
    }).then(res => {
      if (res.data.code == 0) return;
      if (res.data.code == 100) {
        that.setData({
          mobile: true
        })
        console.log('需要绑定手机号')
        return false;
      };
      wx.setStorageSync('token', res.data.data.userinfo.token)
     
      if (res.data.data.userinfo.mobile) {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  },
  submit(e) {
    let that = this;
    let data = e.detail.value;
    data.platform = 'wxxcx';
    data.openid = that.data.openid;
    wx.$http('User/bindmobile', data).then(res => {
      if (res.data.code == 0) return;
      wx.setStorageSync('token', res.data.data.userinfo.token)
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }, 1000);
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
    wx.$http('Sms/send', {
      mobile: that.data.phone
    }).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '发送失败',
          icon: 'none',
          duration: 1500
        })
        return false
      };
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 1500
      })
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