const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


  },
  toAdd() {
    wx.navigateTo({
      url: "/pages/shop/site/add"
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
  onShow() {
    let that = this;
    wx.pro.request({
      url: app.globalData.uri + 'User/getAddressList',
      data: {
        token: app.globalData.token
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log(res.data.data)
      that.setData({
        addList: res.data.data
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