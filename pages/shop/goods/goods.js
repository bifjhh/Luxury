const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [1, 2, 3, 4, 5],
    isImg: 1,
    is_show: 0,
    objs: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.getObjs(that, options.id)
  },
  getObjs(that, id) {
    wx.pro.request({
      url: app.globalData.uri + '/Goods/detail',
      data: {
        id: id,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.setData({
        objs: res.data.data
      })
      console.log(res.data.data)
    })
  },
  /* 计算轮播图事件 */
  current(e) {
    let that = this;
    let isImg = e.detail.current + 1;
    console.log(e.detail.current)
    that.setData({
      isImg
    })
  },
  show(e) {
    var that = this;
    var is_show = e.target.dataset.show * 1;
    that.setData({
      is_show
    })
  },
  addGwc() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  ljgm() {
    wx.navigateTo({
      url: '/pages/shop/pay/pay'
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