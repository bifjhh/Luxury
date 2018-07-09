//获取应用实例
let gdIndex = 1;
const app = getApp()
const uri = app.globalData.uri;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    loadingHidden: true, // loading
    swpPage: 0,
    token: '',
    homeInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Index/index
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
      }
    })
    wx.pro.request({
      url: uri + 'Index/index',
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code != 1) return;
      console.log(res.data)
      that.setData({
        homeInfo: res.data.data
      })
    })
    let palace = [
      {
          "palace_id": 1,
          "palace_name": "四宫格",
          "palace_type": 1,
          "item": [{
              "palace_item_id": 1,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试四宫格1",
              "subtitle": "测试四宫格1",
              "jump_type": 1,
              "to_id": "1"
            },
            {
              "palace_item_id": 2,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试四宫格2",
              "subtitle": "测试四宫格2",
              "jump_type": 1,
              "to_id": "1"
            },
            {
              "palace_item_id": 3,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试四宫格3",
              "subtitle": "测试四宫格3",
              "jump_type": 1,
              "to_id": "1"
            },
            {
              "palace_item_id": 4,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试四宫格4",
              "subtitle": "测试四宫格4",
              "jump_type": 1,
              "to_id": "1"
            }
          ]
        },
        {
          "palace_id": 2,
          "palace_name": "三宫格",
          "palace_type": 0,
          "item": [{
              "palace_item_id": 5,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试三宫格1",
              "subtitle": "测试三宫格1",
              "jump_type": 1,
              "to_id": "1"
            },
            {
              "palace_item_id": 6,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试三宫格2",
              "subtitle": "测试三宫格2",
              "jump_type": 1,
              "to_id": "1"
            },
            {
              "palace_item_id": 7,
              "item_img": "http://test.sh.com/uploads/20180626/e6d3f0364b83624d6d9876e52c38d987.jpg",
              "title": "测试三宫格3",
              "subtitle": "测试三宫格3",
              "jump_type": 1,
              "to_id": "1"
            }
          ]
        }
      ]
  },
  swiperchange(e) {
    console.log(e)
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  toSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search'
    })
  },
  toActivity(e) {
    wx.navigateTo({
      url: '/pages/index/activity/activity'
    })
  },

  toDetails() {
    wx.navigateTo({
      url: "/pages/shop/goods/goods"
    })
  },
  tollkf() {
    wx.navigateTo({
      url: '/pages/my/lxkf/lxkf'
    })
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

})