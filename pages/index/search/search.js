// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objs: {},
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let history = wx.getStorageSync('history');
    that.setData({
      history: history.split(',')
    })
    wx.$http('Index/searchInfo').then(res => {
      that.setData({
        objs: res.data.data
      })
      console.log(res.data.data)
    })
  },

  change(e) {
    let that = this;
    let history = that.data.history;
    let value = e.detail.value.replace(/^\s+|\s+$/g, "");
    if (!value) return;
    if (history.length > 8) {
      history.pop();
      history.unshift(value);
    } else {
      history.unshift(value);
    }
    wx.setStorageSync('history', history.toString())
    console.log(value)
    wx.navigateTo({
      url: '/pages/index/result/result?keywords=' + value
    })
  },
  seacrh(e){
    let val = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '/pages/index/result/result?keywords=' + val
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