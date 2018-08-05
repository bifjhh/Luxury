var app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    status: 0,
    list: [],
    coupon_id: [],
    hbSum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList(that, options.id);
  },
  count(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let list = that.data.list;
    let hbSum = that.data.hbSum;
    let coupon_id = that.data.coupon_id;
    list[index].count = !list[index].count;
    if (list[index].count) {
      coupon_id.push(list[index].user_redpack_id);
      hbSum += list[index].par_value;
    } else {
      hbSum -= list[index].par_value;
      let is = coupon_id.indexOf(list[index].user_redpack_id);
      coupon_id.splice(is, 1);
    }
    that.setData({
      list,
      coupon_id,
      hbSum: hbSum || 0
    })
  },
  submit() {
    let that = this;
    let pages = getCurrentPages();
    if (pages.length < 3) return;
    let prevPage = pages[pages.length - 2];
    let coupon_id = that.data.coupon_id.toString();
    let hbSum = that.data.hbSum;
    prevPage.setData({
      hbId: coupon_id,
      hbSum
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
    wx.$http('User/getRedpackList', data).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '你还没有红包',
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