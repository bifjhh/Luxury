// pages/my/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: ['男', '女'],
    ageindex: 0,
    time: '请选择日期',
    name: '请输入你的昵称',
    nameImg:"/images/my/gerenxinxi_touxiang.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ageChoice(e) {
    console.log(e.detail.value * 1)
    this.setData({
      ageindex: e.detail.value * 1
    })
  },
  birthday(e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  toName() {
    wx.navigateTo({
      url: '/pages/my/info/name/name'
    })
  },

  setImg() {
    let that = this;
    wx.pro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }).then(res=>{
      console.log(res.tempFilePaths)
      that.setData({nameImg:res.tempFilePaths})
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