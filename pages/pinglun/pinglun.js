// pages/pinglun/pinglun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    infoNum: 0,
    type: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      type:options.type
    })
  },

  submit(e) {
    console.log(e.detail.value);
    wx.$http('User/addOpinion', e.detail.value).then(res => {
      if (res.data.code != 1) return;
      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 600
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
    })
  },
  setInput(e) {
    let infoNum = e.detail.value.length;
    this.setData({
      infoNum
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