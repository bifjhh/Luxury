import {confirmOrCancel} from '../../../utils/api.js'
// pages/shop/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    wx.$http('Order/detail', {
      order_id: id
    }).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        info: res.data.data
      })
    })
  },
  pay(e) {
    let id = e.currentTarget.dataset.id;
    wx.$http('Order/pay', {
      order_id: id,
      pay_type: 2,
      platform: 1
    }).then(res => {
      console.log(res)
      if (!res.data.data.wx_pay_info) return;
      let wx_pay_info = res.data.data.wx_pay_info;
      wx.requestPayment({
        'timeStamp': wx_pay_info.timestamp,
        'nonceStr': wx_pay_info.nonce_str,
        'package': 'prepay_id=' + wx_pay_info.prepay_id,
        'signType': 'MD5',
        'paySign': wx_pay_info.sign,
        success: function (data) {
          console.log('successdata', data)
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 600
          })
          wx.navigateTo({
            url: '/pages/my/indent/indent?status=10'
          })
        },
        fail: function (error) {
          console.log('error', error)
        }
      })
    })
  },
  qux(e) {
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '  提示   ',
      content: '确定取消该订单吗？',
      success: function (res) {
        if (res.confirm) {
          wx.$http('Order/confirmOrCancel', {
            order_id: id,
            status: 90
          }).then(data => {
            if (data.data.code != 1) return;
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 1000
            })
            wx.navigateTo({
              url: '/pages/my/indent/indent',
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  clone(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.clone,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  confirm(e) {
    const that = this;
    const data = {
      order_id: e.currentTarget.dataset.order,
      status: 40
    }
    wx.showModal({
      title: '  确定已经收到货了吗  ',
      content: '请在收到货后，进行确认收货操作',
      success: function (res) {
        if (res.confirm) {
          confirmOrCancel(data).then(res => {
            if (res.data.code == 1) {
              wx.showToast({
                title: '收货成功',
                icon: 'success',
                duration: 600
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/my/indent/indent'
                })
              }, 500);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  discuss() {
    wx.showModal({
      title: '  评价  ',
      content: '请在收到货后，进行商品评价',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  toExpress(e) {

    wx.navigateTo({
      url: '/pages/shop/order/express/express?order_id=' + e.currentTarget.dataset.order,
    })
  },
  tokefu() {
    wx.navigateTo({
      url: '/pages/my/lxkf/lxkf'
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