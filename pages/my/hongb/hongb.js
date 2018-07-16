var app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    status: 0,
    list: [
      /* {
              "user_redpack_id": 5,
              "par_value": 100,
              "status": 0,
              "usetime": 0,
              "createtime": "2018-06-22",
              "expirytime": "2018-08-22",
              "redpack_name": "奢物消费红包",
              "resources": "签到活动"
            },
            {
              "user_redpack_id": 8,
              "par_value": 100,
              "status": 0,
              "usetime": 0,
              "createtime": "2018-06-22",
              "expirytime": "2018-08-22",
              "redpack_name": "奢物消费红包",
              "resources": "签到活动"
            } */
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
        that.getList(that)
      }
    })
    if (that.data.token == undefined) return;

  },
  iscard(e) {
    console.log(e.target.dataset.cardid)
    this.setData({
      status: e.target.dataset.cardid * 1,
      page: 0
    })
  },
  getList(that) {

    let data = {
      token: that.data.token,
      p: that.data.page,
      status: that.data.status
    }
    wx.pro.request({
      url: uri + 'User/getRedpackList',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
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