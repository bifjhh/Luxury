const app = getApp()

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
    let that = this;
    let id = options.id;
    if (id == 'undefined') return;
    wx.$http('User/getAddressInfo', {
      address_id: id
    }).then(res => {
      console.log(res.data)
      if (res.data.code != 1) return;
      that.setData({
        info: res.data.data
      })
    })
  },

  addSite(e) {
    let that = this;
    let data = e.detail.value;
    console.log(data)
    wx.$http('User/addOrEditAddress', data).then(res => {
      console.log(res)
      // return;
      if (res.data.code != 1) return;
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
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