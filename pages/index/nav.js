Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        url: "/pages/index/index",
        name: '首页'
      },
      {
        url: "/pages/index/search/search",
        name: '搜索页'
      },
      {
        url: "/pages/index/result/result",
        name: '商品列表-搜索'
      },
      {
        url: "/pages/index/activity/activity",
        name: '活动页'
      },
      {
        url: "/pages/shop/goods/goods",
        name: '商品详情'
      },
      {
        url: "/pages/shop/order/orderList",
        name: '提交订单页面'
      },
      {
        url: "/pages/shop/order/order",
        name: '订单详情'
      },
      {
        url: "/pages/shop/order/discuss",
        name: '空页面'
      },
      {
        url: "/pages/shop/order/refund",
        name: '退款申请页面'
      },
      {
        url: "/pages/shop/order/info/info",
        name: '退款详情'
      },
      {
        url: "/pages/shop/order/express/express",
        name: '快递信息'
      },
      {
        url: "/pages/shop/pay/pay",
        name: '待支付页面'
      },
      {
        url: "/pages/shop/site/site",
        name: '地址列表'
      },
      {
        url: "/pages/shop/site/add",
        name: '添加地址'
      },
      {
        url: "/pages/classify/index",
        name: '分类'
      },
      {
        url: "/pages/cart/index",
        name: '购物车tab'
      },
      {
        url: "/pages/cart2/index",
        name: '购物车'
      },
      {
        url: "/pages/my/index",
        name: '我的'
      },
      {
        url: "/pages/my/lxkf/lxkf",
        name: '客服页面'
      },
      {
        url: "/pages/my/info/info",
        name: '用户信息'
      },
      {
        url: "/pages/my/wallet/wallet",
        name: '钱包'
      },
      {
        url: "/pages/my/wallet/Recharge/Recharge",
        name: '钱包充值'
      },
      {
        url: "/pages/my/wallet/take/take",
        name: '钱包提现'
      },
      {
        url: "/pages/my/wallet/take/addCard",
        name: '添加银行卡'
      },
      {
        url: "/pages/my/wallet/take/takeOk",
        name: 'ok页面'
      },
      {
        url: "/pages/my/info/name/name",
        name: '设置昵称'
      },
      {
        url: "/pages/my/card/card",
        name: '优惠券列表'
      },
      {
        url: "/pages/my/card/is_card",
        name: '选择优惠券'
      },
      {
        url: "/pages/my/getcard/getcard",
        name: '领取优惠券'
      },
      {
        url: "/pages/my/indent/indent",
        name: '订单列表'
      },
      {
        url: "/pages/my/hongb/hongb",
        name: '红包列表'
      },
      {
        url: "/pages/my/hongb/is_hongb",
        name: '选择红包'
      },
      {
        url: "/pages/details/index",
        name: '某一详情'
      },
      {
        url: "/pages/brand/index",
        name: '品牌'
      },
      {
        url: "/pages/list/index",
        name: '品牌列表'
      },
      {
        url: "/pages/pinglun/pinglun",
        name: '评论,反馈'
      },
      {
        url: "/pages/user/index",
        name: '登录'
      },
    ]
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
  toPage(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
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