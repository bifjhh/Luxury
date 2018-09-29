// pages/my/indent/indent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '-1',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.status) {
      that.setData({
        status: options.status
      })
    }
    that.getList(that)
  },
  getList(that) {
    let data = {};
    if(that.data.status != '-1'){
      data.status = that.data.status
    }
    wx.$http('Order/getList', data).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
    })
  },
  pay(e) {
    let id = e.currentTarget.dataset.id;
    wx.$http('Order/pay', {
      order_id: id,
      pay_type: 2,
      platform: 1
    }).then(res => {
      console.log(res)
      if (!res.data.data.wx_pay_info) return;
      let wx_pay_info = res.data.data.wx_pay_info;
      wx.requestPayment({
        'timeStamp': wx_pay_info.timestamp,
        'nonceStr': wx_pay_info.nonce_str,
        'package': 'prepay_id=' + wx_pay_info.prepay_id,
        'signType': 'MD5',
        'paySign': wx_pay_info.sign,
        success: function (data) {
          console.log('successdata', data)
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 600
          })
          wx.navigateTo({
            url: '/pages/shop/order/order?id=' + res.data.data.order_id
          })
        },
        fail: function (error) {
          console.log('error', error)
        }
      })
    })
  },
  iscard(e) {
    let that = this;
    let status = e.currentTarget.dataset.status;
    that.setData({
      status
    })
    that.getList(that)
  },
  toPage(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/order/order?id=' + id
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