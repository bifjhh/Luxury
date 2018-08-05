var app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    page: 0,
    list: [],
    coupon_id: [],
    cardSum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList(that, options.id)
  },
  count(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let list = that.data.list;
    let cardSum = that.data.cardSum;
    let coupon_id = that.data.coupon_id;
    list.forEach((e, i) => {
      if (index == i) {
        list[index].count = !list[index].count;
      } else {
        e.count = false;
      }
    });
    if (list[index].count) {
      coupon_id.push(list[index].user_coupon_id);
      cardSum = list[index].par_value;
    } else {
      cardSum -= list[index].par_value;
    }
    that.setData({
      list,
      coupon_id,
      cardSum: cardSum || 0
    })
  },
  submit() {
    let that = this;
    let pages = getCurrentPages();
    if (pages.length < 3) return;
    let prevPage = pages[pages.length - 2];
    let coupon_id = that.data.coupon_id.toString();
    let cardSum = that.data.cardSum;
    prevPage.setData({
      yhqId: coupon_id,
      cardSum
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    }, 100);
  },
  getList(that, goods_ids) {
    let data = {
      p: that.data.page,
      status: 0,
      goods_ids: goods_ids
    }
    wx.$http('User/getCouponList', data).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '你还没有可用优惠券',
          icon: 'none',
          duration: 2000
        })
      };
      console.log(res.data.data)
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