//获取应用实例
let gdIndex = 1;
const app = getApp()
const uri = app.globalData.uri;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    loadingHidden: true, // loading
    swpPage: 0,
    token: '',
    homeInfo: {},
    shade: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Index/index
    let that = this;

    wx.$http('Index/index').then(res => {
      if (res.data.code != 1) return;
      console.log(res.data)
      that.setData({
        homeInfo: res.data.data
      })
    })
  },
  isShade(e) {
    let that = this;
    let is = e.currentTarget.dataset.is;
    if (is == 0) {
      that.setData({
        shade: false
      })
    } else {
      that.setData({
        shade: true
      })
    }
  },
  swiperchange(e) {
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  current(e) {
    console.log(e.detail.current)
    this.setData({
      swpPage: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  toSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search'
    })
  },
  toActivity(e) {
    let jump_type = e.currentTarget.dataset.jid;
    let tid = e.currentTarget.dataset.tid;
    console.log(tid);
    if (jump_type == 1) {
      wx.navigateTo({
        url: '/pages/index/activity/activity?tid=' + tid
      })
    } else if (jump_type == 0) {
      wx.navigateTo({
        url: '/pages/shop/goods/goods'
      })
    }
  },

  toDetails() {
    wx.navigateTo({
      url: "/pages/shop/goods/goods"
    })
  },
  tollkf() {
    wx.navigateTo({
      url: '/pages/my/lxkf/lxkf'
    })
  },
  toResult(e) {
    let brandId = e.currentTarget.dataset.id;
    console.log('toSearch')
    wx.navigateTo({
      url: '/pages/index/result/result?brand_id=' + brandId
    })
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

})