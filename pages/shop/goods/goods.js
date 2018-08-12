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
    wx.$http('Goods/detail', {
      id: id,
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
  pay(e) {
    let url = e.currentTarget.dataset.url;
    console.log(url)
    wx.navigateTo({
      url:url
    })
    return ;
    wx.$http('Order/add', {
      goods_id: id,
      pay_type: 2,
      buy_num:1,
      platform: 1
    }).then(res => {
      console.log(res)
      if (!res.data.data.wx_pay_info) return;
      let wx_pay_info = res.data.data.wx_pay_info;
      wx.requestPayment({
        'timeStamp': wx_pay_info.timestamp,
        'nonceStr': wx_pay_info.nonce_str,
        'package': 'prepay_id=' + wx_pay_info.prepay_id,
        'signType': 'MD5',
        'paySign': wx_pay_info.sign,
        success: function (data) {
          console.log('successdata', data)
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 600
          })
          wx.navigateTo({
            url: '/pages/my/indent/indent?status=10'
          })
        },
        fail: function (error) {
          console.log('error', error)
        }
      })
    })
  },
  addGwc(e) {
    console.log(e.currentTarget.dataset.goodsid)
    let goods_id = e.currentTarget.dataset.goodsid;
    wx.$http('Cart/add', {
      goods_id: goods_id,
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 1500
      })
    })
    return;

    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  ljgm() {
    console.log(e.currentTarget.dataset.goodsId)
    return;
    wx.navigateTo({
      url: '/pages/shop/pay/pay'
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