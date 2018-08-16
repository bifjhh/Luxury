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

  },
  ageChoice(e) {
    let that = this;
    that.setUserInfo(that, {
      gender: e.detail.value
    })
    that.setData({
      ageindex: e.detail.value
    })
  },
  birthday(e) {
    let that = this;
    that.setUserInfo(that, {
      birthday: e.detail.value
    })

  },
  toName() {
    wx.navigateTo({
      url: '/pages/my/info/name/name'
    })
  },
  getUserInfo(that) {
    wx.$http('User/getUserinfo').then(res => {
      that.setData({
        userInfo: res.data.data.userinfo
      })
    })
  },
  setUserInfo(that, data) {
    wx.$http('User/profile', data).then(res => {
      that.getUserInfo(that)
    })
  },
  setImg() {
    let that = this;
    let token = wx.getStorageSync('token');
    wx.pro.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    }).then(res => {
      console.log(token, res)
      wx.uploadFile({
        url: "https://api.shewuwang.com/api/User/uploadAvatar",
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          'token': token
        },
        success: function (res) {
          let img = JSON.parse(res.data).data.url;
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
    let that = this;
    that.getUserInfo(that, {})
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