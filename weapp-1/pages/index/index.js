//获取应用实例
let gdIndex=1;
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        loadingHidden: true, // loading
        swpPage:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.setData({swpPage:e.detail.current})
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    toSearch(){
        wx.navigateTo({
            url: '/pages/index/search/search'
          })
    },
    toActivity(e) {
        wx.navigateTo({
            url: '/pages/index/activity/activity'
          })
    },

    toDetails(){
         wx.navigateTo({
             url: "/pages/shop/goods/goods"
         })
    },
    tollkf(){
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