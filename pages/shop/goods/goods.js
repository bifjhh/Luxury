const WxParse = require('../../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [1, 2, 3, 4, 5],
    isImg: 1,
    serverList:[],
    is_show: 0,
    cs_show:false,
    goodsList:[],
    objs: {},
    isIphoneX:app.globalData.isIphoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.getObjs(that, options.id)
    that.getServerList(that)
    that.getList(that, options.id)
    wx.$http('Goods/getGmlc').then(res => {
      WxParse.wxParse('getGmlc', 'html', res.data.data.info, that, 5);
    })
  },
  csjs(){
    const that = this;
    wx.$http('Common/chengseshuoming').then(res => {
      this.setData({cs_show:true})
      let info = this.setinfo(res.data.data.info)
      WxParse.wxParse('cs_data', 'html', info, that, 5);
    })
  },
  setinfo(info){
    let str;
    str = info
    .replace(/color:#333333;/g,"color:#333333;\"")
    .replace(/mso-fareast-language:zh-cn;/g,"")
    .replace(/mso-bidi-language:ar-sa"=""/g,"")
    .replace(/mso-ansi-language:en-us;/g,"")
    .replace(/<\/span><\/span>/g,"</span>")
    .replace(/font-family:" 微软雅黑"/g,"")
    .replace(/mso-bidi-font-family:/g,"")
    .replace(/font-size:11.0pt;/g,"")
    .replace(/"sans-serif";/g,"")
    .replace(/<o:p><\/o:p>/g,"")
    .replace(/helvetica;/g,"")
    .replace(/[\r\n]/g,"")
    .replace(/",/g,"\"")
    .replace(/=""/g,"")
    .replace(/;;;/g,"")
    .replace(/;,/g,"")
    ;
    return str;
  },
  csjsEnd(){
    this.setData({cs_show:false})
  },
  getList(that,id) {
    wx.$http('Goods/getList', {
      is_recom:id,
    }).then(res => {
      that.setData({
        goodsList: res.data.data.goods_list
      })
      // console.log(res.data.data)
    })
  },
  getObjs(that, id) {
    wx.$http('Goods/detail', {
      id: id,
    }).then(res => {
      WxParse.wxParse('article', 'html', res.data.data.goods_desc, that, 5);
      that.setData({
        objs: res.data.data
      })
      // console.log(res.data.data)
    })
    
  },
  getServerList(that) {
    wx.$http('Goods/getServerList', {}).then(res => {
      let serverList = res.data.data;
      that.setData({serverList})
    })
    
  },
  toGoods(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/goods/goods?id=' + id
    })
  },
  /* 计算轮播图事件 */
  current(e) {
    let that = this;
    let isImg = e.detail.current + 1;
    console.log(e.detail.current)
    that.setData({
      isImg
    })
  },
  show(e) {
    var that = this;
    var is_show = e.target.dataset.show * 1;
    that.setData({
      is_show
    })
  },
  pay(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  addGwc(e) {
    // console.log(e.currentTarget.dataset.goodsid)
    let goods_id = e.currentTarget.dataset.goodsid;
    wx.$http('Cart/add', {
      goods_id: goods_id,
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 1500
      })
    })
  },
  toPage(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
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