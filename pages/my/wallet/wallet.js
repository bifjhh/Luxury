// pages/my/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTab: 0,
    list: [],
    wallet_balance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList(that, 0);
    wx.$http('User/getUserinfo').then(res => {
      if (res.data.code != 1) return;
      that.setData({
        wallet_balance: res.data.data.userinfo.wallet_balance
      })
    })
  },
  getList(that, type) {
    wx.$http('Wallet/getUseLog', {
      type: type
    }).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
    })
  },
  isShow(e) {
    let that = this;
    let type = e.currentTarget.dataset.istab;
    this.setData({
      isTab: type
    })
    that.getList(that, type)

  },
  toRecharge() {
    wx.navigateTo({
      url: "/pages/my/wallet/Recharge/Recharge",

    })
  },
  toTx() {
    wx.navigateTo({
      url: "/pages/my/wallet/take/take",

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