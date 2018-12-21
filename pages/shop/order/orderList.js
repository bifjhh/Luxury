// pages/shop/order/order.js
import {
  isSetPayPwd
} from '../../../utils/api.js'
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
    buy_num: '',
    yhqId: '',
    hbId: '',
    cardNum: 0,
    cardSum: 0,
    hbNum: 0,
    hbSum: 0,
    isCart: true,
    status: 2,
    password: null,
    showPsw: false,
    isSetPsw: 0
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
    let buy_num = [];
    if (datas.length < 1) return;
    if (options.id) {
      console.log('不是购物车', options);
      let sum = datas[datas.length - 2].data.objs.price;
      list = [datas[datas.length - 2].data.objs];
      that.setData({
        isCart: false,
        list,
        sum: parseInt(sum * 100) / 100,
        cart_id: options.id
      })
      that.getHb(that, options.id);
      that.getCart(that, options.id);
      // that.getAddressList(that)
      return false;
    }
    console.log('购物车')

    datas[datas.length - 2].data.list.map(e => {
      if (e.status) {
        list.push(e);
        sum += e.price * e.buy_num;
        cart_id.push(e.cart_id);
        buy_num.push(e.buy_num);
      };
    })
    that.setData({
      list,
      sum: parseInt(sum * 100) / 100,
      cart_id: cart_id.toString(),
      buy_num: buy_num.toString()
    })
    that.getAddressList(that)
    that.getHb(that, cart_id.toString());
    that.getCart(that, cart_id.toString());

  },
  getHb(that, id) {
    wx.$http('User/getRedpackList', {
      goods_ids: id
    }).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        hbNum: res.data.data.length
      })
    })
  },
  getCart(that, id) {
    wx.$http('User/getCouponList', {
      goods_ids: id
    }).then(res => {
      if (res.data.code != 1) return;
      that.setData({
        cardNum: res.data.data.length
      })
    })
  },
  getAddressList(that) {
    wx.$http('User/getAddressList').then(res => {
      let list = res.data.data;
      let flag = false
      list.forEach((e, i) => {
        if (e.is_default == 1) {
          flag = true
          that.setData({
            address: e
          })
        }
      });
      if (!flag) {
        that.setData({
          address: list[0]
        })
      }
    })
  },
  countIcon(e) {
    const that = this;
    that.setData({
      status: e.currentTarget.dataset.status
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    isSetPayPwd().then(res => {
      console.log('res', res.data.code)
      let isSetPsw = res.data.code
      that.setData({
        isSetPsw
      })
    })
    let endSum = that.data.sum - that.data.hbSum - that.data.cardSum;
    if (endSum <= 0) {
      endSum = 0
    }
    that.setData({
      endSum
    })
    that.getAddressList(that)
  },
  ask() {
    const that = this;
    if (that.data.status == 3) {
      if (that.data.isSetPsw != 0) {
        that.setData({
          showPsw: true
        })
      } else {
        wx.showModal({
          // title: '暂未设置支付密码',
          content: '暂未设置支付密码,请先设置支付密码',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/my/set/password',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    } else {
      that.submit()
    }
  },
  endPsw(e) {
    const that = this;
    that.setData({
      showPsw: false
    })
  },
  wjmm() {
    wx.navigateTo({
      url: '/pages/my/set/password',
    })
  },
  bindinput(e) {
    if(e.detail.value.length == 6) {
      wx.showLoading({
        title: '支付中...',
      })
      this.submit(e)
    }
  },
  submit(e) {
    let that = this;
    const status = that.data.status;
    that.endPsw()
    let data;
    if (that.data.isCart) {
      data = {
        address_id: that.data.address.address_id,
        is_cart: 1,
        cart_ids: that.data.cart_id,
        pay_type: that.data.status,
        user_coupon_id: that.data.yhqId,
        user_redpack_id: that.data.hbId,
        platform: 1,
        buy_num: that.data.buy_num
      }
    } else {
      data = {
        address_id: that.data.address.address_id,
        goods_id: that.data.cart_id,
        pay_type: that.data.status,
        buy_num: 1,
        user_coupon_id: that.data.yhqId,
        user_redpack_id: that.data.hbId,
        platform: 1
      }
    }
    if (e && e.detail.value) {
      data.pay_pwd = e.detail.value
    }

    wx.$http('Order/add', data).then(res => {
      if (res.data.code == 1) {
        wx.hideLoading()
        if(status==3){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 600
          })
          setTimeout(() => {
            wx.navigateTo({
              // url: '/pages/shop/order/order?id=' + res.data.data.order_id
              url: '/pages/shop/pay/index?order_id=' + res.data.data.order_id
            })
          }, 500);
          return false;
        }
        // if (!res.data.data.wx_pay_info) return;
        let wx_pay_info = res.data.data.wx_pay_info;
        wx.requestPayment({
          'timeStamp': wx_pay_info.timestamp,
          'nonceStr': wx_pay_info.nonce_str,
          'package': 'prepay_id=' + wx_pay_info.prepay_id,
          'signType': 'MD5',
          'paySign': wx_pay_info.sign,
          success: function (data) {
            setTimeout(() => {
              wx.navigateTo({
                // url: '/pages/shop/order/order?id=' + res.data.data.order_id
                url: '/pages/shop/pay/index?order_id=' + res.data.data.order_id
              })
            }, 500);
          },
          fail: function (error) {
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 600
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/my/indent/indent?status=-1'
              })
            }, 500);
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
        })
      }

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