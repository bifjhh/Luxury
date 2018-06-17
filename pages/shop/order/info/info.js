// pages/shop/order/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    causeList: ['请选择', '1', '2', '3', ],
    causeIndex: 0,
    imgs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  cause(e) {
    let index = parseInt(e.detail.value)
    this.setData({
      causeIndex: index
    });
  },

  submit(e){
    console.log(e.detail.value)
    console.log(this.data.imgs)
    wx.navigateTo({
      url: '/pages/my/indent/indent'
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