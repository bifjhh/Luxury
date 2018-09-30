import {addEval} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    infoNum: 0,
    type: '0',
    order_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      type:options.type,
      order_id:options.order_id
    })
    if (options.order_id) {
      that.setData({
        order_id:options.order_id
      })
    }
  },

  submit(e) {
    let data = e.detail.value;
    if (this.data.order_id) {
      let obj = {
        order_id : this.data.order_id,
        eval_cont: data.content
        
      }
      addEval(obj).then(res=>{
        if(res.data.code == 0){
          wx.showToast({
            title: '评价成功',
            icon: 'success',
            duration: 600
          })
          setTimeout(() => {
            // wx.navigateBack({
            //   delta: 1, 
            // })
            wx.navigateTo({
              url: '/pages/shop/pay/index?type=1&order_id='+obj.order_id
            })
            // wx.switchTab({
            //   url: '/pages/index/index'
            // })
          }, 500);
        }
      })
      return false;
    }
    wx.$http('User/addOpinion', data).then(res => {
      if (res.data.code != 1) return;
      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 600
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
    })
  },
  setInput(e) {
    let infoNum = e.detail.value.length;
    this.setData({
      infoNum
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