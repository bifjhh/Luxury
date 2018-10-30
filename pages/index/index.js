//获取应用实例
let gdIndex = 1;
const app = getApp()
const uri = app.globalData.uri;
var page = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {

    loadingHidden: true, // loading
    swpPage: 0,
    token: '',
    goodsList:[],
    homeInfo: {},
    shade: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 0;
    // Index/index
    let that = this;

    wx.$http('Index/index').then(res => {
      if (res.data.code != 1) return;
      console.log(res.data)
      that.setData({
        homeInfo: res.data.data
      })
    })
    that.getList(that,page)
  },

  getList(that) {
    const list = that.data.goodsList || [];

    wx.$http('Goods/getList', {
      is_recom: '0',p:page
    }).then(res => {
      const goodsList = list.concat(res.data.data.goods_list)

      that.setData({
        goodsList
      })
      setTimeout(()=>{
        wx.hideLoading()
      },1000)
      // console.log(res.data.data)
    })
  }, 
  toGoods(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/goods/goods?id=' + id
    })
  },
  isShade(e) {
    let that = this;
    let is = e.currentTarget.dataset.is;
    if (is == 0) {
      that.setData({
        shade: false
      })
    } else {
      that.setData({
        shade: true
      })
    }
  },
  swiperchange(e) {
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  current(e) {
    this.setData({
      swpPage: e.detail.current
    })
  },
  goTop(){
     wx.pageScrollTo({
       scrollTop: 0
     })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toPage(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  toActivity(e) {
    let jump_type = e.currentTarget.dataset.jid;
    let tid = e.currentTarget.dataset.tid;
    console.log(jump_type);

    if (jump_type == 0) {
      wx.navigateTo({
        url: '/pages/shop/goods/goods?id=' + tid
      })
    } else if (jump_type == 1) {
      wx.navigateTo({
        url: '/pages/index/activity/activity?tid=' + tid
      })
    } else if (jump_type == 2) {
      wx.navigateTo({
        url: '/pages/index/result/result?cate_id=3'+ tid
      })
    }
  },
  toActivity1(e) {
    let jump_type = e.currentTarget.dataset.jid;
    let tid = e.currentTarget.dataset.tid;
    let src = e.currentTarget.dataset.src;
    console.log(jump_type);

    if (jump_type == 1) {
      wx.navigateTo({
        url: '/pages/shop/goods/goods?id=' + tid
      })
    } else if (jump_type == 2) {
      wx.navigateTo({
        url: '/pages/index/activity/activity?tid=' + tid
      })
    } else if (jump_type == 3) {
      wx.navigateTo({
        url: '/pages/web/index?src='+ src
      })
    }
  },

  toDetails() {
    wx.navigateTo({
      url: "/pages/shop/goods/goods"
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })

    const that = this;
    page++
    that.getList(that)
  },

})