// pages/shop/order/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.$http('Order/refundInfo', {
      order_id: options.id,
    }).then(res => {
      that.setData({
        info: res.data.data
      })
    })
  },

  cause(e) {
    let index = parseInt(e.detail.value)
    this.setData({
      causeIndex: index
    });
  },

  submit(e) {
    const that = this
    let id = e.currentTarget.dataset.id;
    wx.$http('Order/cancelRefund', {
      refund_id: id,
    }).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my/indent/indent?id=' + that.data.info.order_id
          })
        }, 900);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
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