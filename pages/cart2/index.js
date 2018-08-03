const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    list: [],
    sum: 0,
    statuAll: false,
    delAll: false,
    cart_id: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.token)
    let that = this;
    that.getList(that)
  },
  getList(that) {
    wx.$http('/Cart/getList').then(res => {
      if (res.data.code != 1) return;
      that.setData({
        list: res.data.data
      })
    })
  },
  setStatus(e) {
    console.log()
    this.setData({
      status: parseInt(e.target.dataset.status)
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
    let is = 0;
    list.forEach(e => {
      if (!e.status) {
        is += 1;
      }
    })
    if (is == 0) {
      that.setData({
        statuAll: true
      })
    } else {
      that.setData({
        statuAll: false
      })
    }
    let sum = that.data.sum;
    if (list[index].status) {
      sum += list[index].price * list[index].buy_num;
      that.setData({
        sum
      })
    } else {
      sum -= list[index].price * list[index].buy_num;
      if (sum >= 0) {
        that.setData({
          sum
        })
      } else {
        that.setData({
          sum: 0
        })
      }
    }
  },
  setgoods(e) {
    // console.log(e.currentTarget.dataset.index)
    let that = this;
    let list = that.data.list;
    let cart_id = that.data.cart_id;
    let index = e.currentTarget.dataset.index;
    list[index].set = !list[index].set;
    let isid = cart_id.indexOf(list[index].cart_id)
    if (list[index].set && isid == -1) {
      if (list[index].cart_id) {}
      cart_id.push(list[index].cart_id)
    } else {
      cart_id.splice(isid, 1)
    }
    that.setData({
      list
    })
    let is = 0;
    list.forEach(e => {
      if (!e.set) {
        is += 1;
      }
    })
    if (is == 0) {
      that.setData({
        delAll: true
      })
    } else {
      that.setData({
        delAll: false
      })
    }
  },
  all() {
    let that = this;
    let status = that.data.status;
    let list = that.data.list;
    let statuAll = that.data.statuAll;
    let delAll = that.data.delAll;
    let sum = 0;
    let cart_id = [];
    if (status == 1) {
      if (!delAll) {
        delAll = true;
        list.forEach(e => {
          e.set = true;
          cart_id.push(e.cart_id)
        });
      } else {
        delAll = false;
        cart_id = [];
        list.forEach(e => {
          e.set = false;
        });
      }
    } else if (status == 0) {
      if (!statuAll) {
        statuAll = true;
        list.forEach((e, i) => {
          e.status = true;
          sum += list[i].price * list[i].buy_num;
        });
        that.setData({
          sum
        })
      } else {
        statuAll = false;
        that.setData({
          sum: 0
        })
        list.forEach((e, i) => {
          e.status = false;
        });
      }
    }
    that.setData({
      list,
      statuAll,
      delAll,
      cart_id
    })
  },
  delGoods() {
    let that = this;
    let cart_id = that.data.cart_id.toString();
    wx.$http('Cart/del', {
      cart_id: cart_id
    }).then(res => {
      if (res.data.code != 1) return;
      that.getList(that);
    })
  },
  end() {
    //status
    let that = this;
    let list = that.data.list;
    let status = 0;
    list.forEach(e => {
      if (e.status) {
        status += 1;
      }
    });
    console.log(status)
    if (status == 0) {
      wx.showToast({
        title: '请选择至少一个商品',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.navigateTo({
      url: '/pages/shop/order/orderList'
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