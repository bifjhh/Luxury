const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


  },
  toAdd(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/shop/site/add?id=" + id
    })
  },
  delAddress(e) {
    let that = this;
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.$http('User/delAddress', {
      address_id: id
    }).then(res => {
      if (res.data.code != 1) return;
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000
      })
      that.getList(that)
    })
  },
  setAddress(e) {
    let that = this;
    let addList = that.data.addList;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    addList.forEach((e, i) => {
      if (index == i) {
        let is = addList[index].is_default == 0 ? 1 : 0;
        addList[index].is_default = is;
      } else {
        e.is_default = 0;
      }
    });
    wx.$http('User/addOrEditAddress', {
      address_id: id,
      is_default: addList[index].is_default
    }).then(res => {
      if (res.data.code != 1) return;
      console.log('设置成功')
      that.setData({
        addList
      })
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
  onShow() {
    let that = this;
    that.getList(that)
  },
  getList(that) {
    wx.$http('User/getAddressList').then(res => {
      console.log(res.data.data)
      that.setData({
        addList: res.data.data
      })
    })
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