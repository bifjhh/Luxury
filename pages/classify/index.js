var app = getApp()
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 0,
        curIndex: 0,
        is_show:1,
    },
    onLoad: function() {
        var that = this
        
        
    },
    toDetail(){
        wx.navigateTo({
            url: '/pages/shop/goods/goods',
        })
    },

    //事件处理函数
    switchRightTab: function(e) {
        let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
			curIndex: index
		})
    },
    show(e){
        var that = this;
        var is_show = e.target.dataset.show * 1;
        that.setData({ is_show})
    }

})