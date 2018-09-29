// pages/my/set/setPsw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit(e) {
    console.log(e.detail.value)
    const data = e.detail.value
    if (data.psw1.length !== 6) {
      wx.showToast({
        title: '请输入6位数字密码',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    if (data.psw1 !== data.psw2) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1500
      })
      return false

    }
    wx.$http('User/setPayPwd',{pwd:data.psw1}).then(res => {
      if (res.data.code == 1){
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1500
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/index'
          })
        }, 1400);
      };
      
    })
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