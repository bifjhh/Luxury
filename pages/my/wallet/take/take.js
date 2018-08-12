// pages/my/wallet/take/take.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    cash_price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addcard() {
    wx.navigateTo({
      url: '/pages/my/wallet/take/addCard'
    })
  },
  input(e) {
    let that = this;
    that.setData({
      cash_price: e.detail.value
    })
  },
  took(e) {
    let that = this;
    let user_bank_id = e.currentTarget.dataset.id;
    wx.$http("Wallet/addCash", {
      user_bank_id: user_bank_id,
      cash_price: that.data.cash_price
    }).then(res => {
      if (res.data.code != 1) return;
      wx.navigateTo({
        url: '/pages/my/wallet/take/takeOk'
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
    let that = this;
    wx.$http('Wallet/getBankInfo').then(res => {
      if (res.data.code != 1) return;
      that.setData({
        info: res.data.data
      })
    })
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