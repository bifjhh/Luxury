var app = getApp()
Page({
	data: {
		navLeftItems: [],
		navRightItems: [],
		curNav: 0,
		curIndex: 0,
		is_show: 1,
	},
	onLoad: function () {
		let that = this


	},
	onShow() {
		let that = this

		wx.pro.request({
			url: app.globalData.uri + 'Index/brandList',
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			console.log(res)
		})
	},
	toDetail() {
		wx.navigateTo({
			url: '/pages/shop/goods/goods',
		})
	},

	//事件处理函数
	switchRightTab: function (e) {
		let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
			curIndex: index
		})
	},
	show(e) {
		let that = this;
		let is_show = e.target.dataset.show * 1;
		that.setData({
			is_show
		})
	}

})