const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    set: 0,
    list: [],
    sum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.token)
    let that = this;
    wx.$http('/Cart/getList').then(res => {
      that.setData({
        list: res.data.data
      })
    })
  },
  setGoods(e) {
    console.log()
    this.setData({
      set: parseInt(e.target.dataset.set)
    })
  },

  count(e) {
    // console.log(e.currentTarget.dataset.index)
    let that = this;
    let list = that.data.list;
    let index = e.currentTarget.dataset.index;
    list[index].status = !list[index].status;
    that.setData({
      list
    })
    if (list[index].status) {
      let sum = that.data.sum;
      sum += list[index].price*list[index].buy_num;
      that.setData({
        sum
      })
    }
  },
  setgoods(e) {
    // console.log(e.currentTarget.dataset.index)
    let that = this;
    let list = that.data.list;
    let index = e.currentTarget.dataset.index;
    list[index].set = !list[index].set;
    that.setData({
      list
    })
  },
  end(){
    wx.navigateTo({
      url:'/pages/shop/order/orderList'
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