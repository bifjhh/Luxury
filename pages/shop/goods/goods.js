const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [1, 2, 3, 4, 5],
    isImg: 1,
    is_show: 0,
    list:[],
    objs: {},
    isIphoneX:app.globalData.isIphoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.getObjs(that, options.id)
    that.getList(that, options.id)
  },
  getList(that,id) {
    wx.$http('Goods/getList', {
      is_recom: 'n-'+id,
    }).then(res => {
      that.setData({
        list: res.data.data
      })
      // console.log(res.data.data)
    })
  },
  getObjs(that, id) {
    wx.$http('Goods/detail', {
      id: id,
    }).then(res => {
      that.setData({
        objs: res.data.data
      })
      // console.log(res.data.data)
    })
  },
  toGoods(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/goods/goods?id=' + id
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
  pay(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  addGwc(e) {
    // console.log(e.currentTarget.dataset.goodsid)
    let goods_id = e.currentTarget.dataset.goodsid;
    wx.$http('Cart/add', {
      goods_id: goods_id,
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 1500
      })
    })
  },
  toPage(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
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