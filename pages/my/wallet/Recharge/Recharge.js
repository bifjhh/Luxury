// pages/my/wallet/Recharge/Recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList(that);
  },
  getList(that) {
    wx.$http('Wallet/getRechargeList').then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
    })
  },
  opt(e) {
    let that = this;
    let list = that.data.list;
    let price = that.data.price;
    let index = e.currentTarget.dataset.index;
    list.forEach((e, i) => {
      if (index == i) {
        e.status = 1;
        price = e.price;
      } else {
        e.status = 0;
      }
    });
    that.setData({
      list,
      price
    })
  },
  pay() {
    let that = this;
    wx.$http('Wallet/ref', {
      pay_type: 2,
      total_price: that.data.price,
      platform: 1
    }).then(res => {
      if (res.data.code != 1) return;
      let wx_pay_info = res.data.data.wx_pay_info
      wx.requestPayment({
        'timeStamp': wx_pay_info.timestamp,
        'nonceStr': wx_pay_info.nonce_str,
        'package': 'prepay_id=' + wx_pay_info.prepay_id,
        'signType': 'MD5',
        'paySign': wx_pay_info.sign,
        success: function (data) {
          console.log('successdata', data)
          wx.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 500);
        },
        fail: function (error) {
          console.log('error', error)
          wx.showToast({
            title: '充值失败',
            icon: 'none',
            duration: 1500
          })
        }
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