// pages/shop/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sum: 0,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let datas = getCurrentPages();
    let list = [];
    let sum = 0;
    let address = {};
    wx.$http('User/getAddressList').then(res => {
      console.log(res.data.data)
      let list = res.data.data;
      let i = null;
      list.forEach((e, i) => {
        console.log(e, i)
        if (list[i].is_default == 1) {
          address = list[i]
        }
      });
      if (address.is_default) {
        that.setData({
          address
        })
      } else {
        that.setData({
          address: list[0]
        })
      }
    })

    if (datas.length < 1) return;
    datas[datas.length - 2].data.list.map(e => {
      if (e.status) {
        list.push(e);
        sum += e.price * e.buy_num;
      };
    })
    that.setData({
      list,
      sum
    })

  },
  submit() {
    return;
    wx.navigateTo({
      url: '/pages/shop/order/order'
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
      sum += list[index].price * list[index].buy_num;
      that.setData({
        sum
      })
    }
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