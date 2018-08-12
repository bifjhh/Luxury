var app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    status: 0,
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
    let that = this;
    let id = e.currentTarget.dataset.cardid;
    that.setData({
      status: id,
      page: 0
    })
    that.getList(that)
  },
  getList(that) {
    let data = {
      p: that.data.page,
      status: that.data.status
    }
    wx.$http('User/getRedpackList', data).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
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