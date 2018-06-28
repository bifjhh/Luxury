// pages/my/info/info.
const app = getApp()
const uri = app.globalData.uri;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: ['女', '男'],
    ageindex: 0,
    time: '请选择日期',
    name: '请输入你的昵称',
    nameImg: "/images/my/gerenxinxi_touxiang.png",
    token: null,
    userInfo: {}
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
        that.getUserInfo(that, {});
      }
    })


  },
  ageChoice(e) {
    let that = this;
    console.log(that.data)
    console.log(e.detail.value * 1)
    that.setUserInfo(that, {
      gender: e.detail.value * 1
    })
    that.setData({
      ageindex: e.detail.value * 1
    })
  },
  birthday(e) {
    let that = this;

    that.setUserInfo(that, {
      birthday: e.detail.value
    })
    console.log(e.detail.value)

  },
  toName() {
    wx.navigateTo({
      url: '/pages/my/info/name/name'
    })
  },
  getUserInfo(that, data) {
    data.token = that.data.token
    wx.pro.request({
      url: uri + 'User/getUserinfo',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.setData({
        userInfo: res.data.data.userinfo
      })
    })
  },
  setUserInfo(that, data) {
    data.token = that.data.token
    wx.pro.request({
      url: uri + 'User/profile',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.getUserInfo(that, {})
    })
  },
  setImg() {
    let that = this;
    wx.pro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }).then(res => {
      console.log(res.tempFilePaths[0])
      wx.uploadFile({
        url: uri + "User/uploadAvatar", //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          'token': that.data.token
        },
        success: function (res) {
          let img = JSON.parse(res.data).data.url;
          console.log(img)
          that.getUserInfo(that, {})
        }
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