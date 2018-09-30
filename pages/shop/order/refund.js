// pages/shop/order/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    causeList: [],
    causeIndex: 0,
    imgs: [],
    goodsData: {},
    formData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    var prevPage = pages[pages.length - 2]; //上一个页面
    that.setData({
      goodsData: prevPage.data.info
    })
    const formData = this.data.formData
    formData.refund_price = prevPage.data.info.pay_price
    formData.order_id = prevPage.data.info.order_id

    wx.$http('Order/getRefundDescList').then(res => {

      formData.refund_desc = res.data.data[0]

      that.setData({
        causeList: res.data.data,
        formData
      })
    })
  },
  explain(e){
    const formData = this.data.formData
    formData.refund_explain = e.detail.value
    this.setData({formData})
  },
  cause(e) {
    let index = parseInt(e.detail.value)
    const formData = this.data.formData
    formData.refund_desc = this.data.causeList[index]
    this.setData({
      causeIndex: index,
      formData
    });
  },

  upimg() {
    let that = this;
    let imgs = that.data.imgs;
    let token = wx.getStorageSync('token');
    const formData = this.data.formData

    wx.pro.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    }).then(res => {
      wx.showLoading({
        title: '上传中',
      })
      wx.uploadFile({
        url: "https://api.shewuwang.com/api/Common/upload",
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          'token': token
        },
        success: function (res) {
          let img = JSON.parse(res.data).data.url;
          imgs.push(img)
          that.setData({
            imgs
          })
          formData.refund_img = imgs.join(',')
          that.setData({formData})
          wx.hideLoading()
        }
      })
    })
  },
  preview(e) {
    let that = this;
    let src = e.target.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: that.data.imgs // 需要预览的图片http链接列表
    })
  },
  submit(e) {
    const that = this;
    const formData = that.data.formData
    wx.$http('Order/refund',formData).then(res => {
      if(res.data.code == 1){
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my/indent/indent?id='+that.data.goodsData.order_id
          })
        }, 900);
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
        })
      }
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