var app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    page: 0,
    list: [
      /* {
            "user_coupon_id": 1,
            "coupon_name": "神券",
            "par_value": 200,
            "use_condition": 1,
            "goods_ids": "全场通用",
            "status": 0,
            "usetime": 0,
            "createtime": "2018-06-22 21:42:00",
            "expirytime": "2018-08-22 21:42:00"
          }, {
            "user_coupon_id": 2,
            "coupon_name": "神券",
            "par_value": 100,
            "use_condition": 1,
            "goods_ids": "全场通用",
            "status": 0,
            "usetime": 0,
            "createtime": "2018-06-22 21:42:00",
            "expirytime": "2018-08-22 21:42:00"
          } */
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  },
  iscard(e) {
    console.log(e.target.dataset.cardid)
    this.setData({
      status: e.target.dataset.cardid * 1,
      page: 0,

    })
  },
  getList(that) {
    let data = {
      p: that.data.page,
      status: that.data.status
    }
    wx.$http('User/getCouponList', data).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '你还没有优惠券',
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