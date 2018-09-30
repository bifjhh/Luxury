// pages/my/set/password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    isCode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.getUserInfo(that)
  },
  getUserInfo(that) {
    wx.$http('User/getUserinfo').then(res => {
      if (res.data.code != 1) return;
      that.setData({
        mobile: res.data.data.userinfo.mobile,
      })
    })
  },
  toGo(e){
    const formData = e.detail.value
    wx.$http("Sms/check", formData).then(res=>{
      if(res.data.code == 1){
        wx.navigateTo({
          url: '/pages/my/set/setPsw'
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1300
        })
      }
    })
  },
  getCode(){
    const that = this;
    if (that.data.isCode) {
      wx.showToast({
        title: '已发送,请稍后再试',
        icon: 'none',
        duration: 1300
      })
      return false;
    }
    wx.$http("Sms/send", {
      mobile:that.data.mobile,
      event:'paypwd'
    }).then((res) => {
      if(res.data.code == 1){
        that.setData({
          isCode:true
        })
        setTimeout(() => {
          that.setData({
            isCode:false
          })
        }, 60000);
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1300
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1300
        })
      }
    }).catch((err) => {
      
    });
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