// pages/my/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setPassword(){
    wx.navigateTo({
      url: '/pages/my/set/password'
    })
  },
  toPage(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  clearStorage(){
    wx.showModal({
      title: '确认清楚本地缓存吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '清理中...',
          })
          wx.clearStorage()
          setTimeout(() => {
            wx.hideLoading()
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 1500);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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