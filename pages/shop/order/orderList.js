// pages/shop/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sum: 0,
    endSum: 0,
    address: {},
    cart_id: '',
    yhqId: '',
    hbId: '',
    cardNum: 0,
    cardSum: 0,
    hbNum: 0,
    hbSum: 0,
    isCart: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let datas = getCurrentPages();
    let list = [];
    let sum = 0;
    let cart_id = [];
    if (datas.length < 1) return;
    if (options.id) {
      console.log('不是购物车');
      let sum = datas[datas.length - 2].data.objs.price;
      list = [datas[datas.length - 2].data.objs];
      that.setData({
        isCart: false,
        list,
        sum,
        cart_id: options.id
      })
      that.getHb(that);
      that.getCart(that);
      return false;
    }
    console.log('购物车')

    datas[datas.length - 2].data.list.map(e => {
      if (e.status) {
        list.push(e);
        sum += e.price * e.buy_num;
        cart_id.push(e.cart_id)
      };
    })
    that.setData({
      list,
      sum,
      cart_id: cart_id.toString()
    })
    that.getHb(that);
    that.getCart(that);


  },
  getHb(that) {
    wx.$http('User/getRedpackList', {
      goods_ids: that.cart_id
    }).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        hbNum: res.data.data.length
      })
      console.log(res.data)
    })
  },
  getCart(that) {
    wx.$http('User/getCouponList', {
      goods_ids: that.cart_id
    }).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        cardNum: res.data.data.length
      })
      console.log(res.data)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
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

    let endSum = that.data.sum - that.data.hbSum - that.data.cardSum;
    if (endSum <= 0) {
      endSum = 0
    }
    that.setData({
      endSum
    })
  },
  submit() {
    let that = this;
    let data;
    if (that.isCart) {
      data = {
        address_id: that.data.address.address_id,
        is_cart: 1,
        cart_ids: that.data.cart_id,
        pay_type: 2,
        user_coupon_id: that.data.yhqId,
        user_redpack_id: that.data.hbId,
        platform: 1
      }
    } else {
      data = {
        address_id: that.data.address.address_id,
        goods_id: that.data.cart_id,
        pay_type: 2,
        buy_num: 1,
        user_coupon_id: that.data.yhqId,
        user_redpack_id: that.data.hbId,
        platform: 1
      }
    }
    wx.$http('Order/add', data).then(res => {
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
          console.log('data', data)
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 600
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/shop/order/order?id=' + res.data.data.order_id
            })
          }, 500);
        },
        fail: function (error) {
          console.log('error', error)
        }
      })
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
    let cart_id = this.data.cart_id;
    wx.navigateTo({
      url: url + '?id=' + cart_id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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