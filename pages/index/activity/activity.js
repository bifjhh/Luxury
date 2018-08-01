const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    objs: {},
    sortId: 0,
    tid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      tid: options.tid
    })
    that.getObjs(that, options.tid, 0)
  },
  getObjs(that, activity_id, sort) {
    wx.pro.request({
      url: app.globalData.uri + 'Goods/getList',
      data: {
        activity_id: activity_id,
        sort: sort
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.setData({
        objs: res.data.data
      })
      console.log(res.data.data)
    })
  },
  sort(e) {
    let that = this;
    console.log(e.currentTarget.dataset.sort);
    let sortId = e.currentTarget.dataset.sort;
    switch (sortId * 1) {
      case 0:
        console.log(sortId)
        that.getObjs(that, that.data.tid, sortId)
        that.setData({
          sortId: 0
        })
        break;
      case 1:
        console.log(sortId)
        that.getObjs(that, that.data.tid, sortId)
        that.setData({
          sortId: 2
        })
        break;
      case 2:
        console.log(sortId)
        that.getObjs(that, that.data.tid, sortId)
        that.setData({
          sortId: 1
        })
        break;
      case 10:
        console.log(sortId)
        that.getObjs(that, that.data.tid, sortId)
        that.setData({
          sortId: 11
        })
        break;
      case 11:
        console.log(sortId)
        that.getObjs(that, that.data.tid, sortId)
        that.setData({
          sortId: 10
        })
        break;
      default:
    }
  },
  toGoods(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/goods/goods?id=' + id
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
  onShow: function () {},

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