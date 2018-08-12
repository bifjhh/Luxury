// pages/my/wallet/take/addCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankList: [],
    bankIndex: 0,
    bank_id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.$http('Wallet/getBankList').then(res => {
      if (res.data.code != 1) return;
      res.data.data.unshift({
        bank_name: '请选择开卡银行'
      })
      that.setData({
        bankList: res.data.data
      })
    })
  },
  setbank(e) {
    let that = this;
    let bankList = that.data.bankList;
    let bankIndex = e.detail.value;
    let bank_id = bankList[bankIndex].bank_id;
    this.setData({
      bankIndex,
      bank_id
    })
  },
  toGo(e) {
    console.log(e)
    let that = this;
    let data = e.detail.value;

    data.bank_id = that.data.bank_id;
    wx.$http('Wallet/addOrEditBank', data).then(res => {
      if (res.data.code != 1) return;
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        duration: 1000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
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