var app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    page: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList(that)
  },
  iscard(e) {
    console.log(e.target.dataset.cardid)
    this.setData({
      status: e.target.dataset.cardid * 1,
      page: 0,

    })
  },
  getList(that) {
    let data = {
      p: that.data.page,
    }
    wx.$http('Coupon/getList', data).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
      console.log(res.data)
    })
  },
  getCard(e) {
    let id = e.currentTarget.dataset.id;
    wx.$http('Coupon/receive', {
      coupon_id: id
    }).then(res => {
      if (res.data.code != 1) return;
      wx.showToast({
        title: '领取成功',
        icon: 'success',
        duration: 1000
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