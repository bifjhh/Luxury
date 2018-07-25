var app = getApp()
Page({
	data: {
		brandList: [],
		nav: [],
		goodsList: [],
		is_show: 1,
		curNav:'',
	},
	onLoad: function () {
		var that = this

	},
	toDetail() {
		wx.navigateTo({
			url: '/pages/shop/goods/goods',
		})
	},

	//事件处理函数
	switchRightTab: function (e) {
		let that = this;
		let id = e.target.dataset.id;
		that.setData({curNav:id})

		that.getGoods(that, id)
	},
	show(e) {
		var that = this;
		var is_show = e.target.dataset.show * 1;
		that.setData({
			is_show
		})
	},
	onLoad: function (options) {
		let that = this
		wx.pro.request({
			url: app.globalData.uri + 'Index/brandList',
			data: {},
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			that.setData({
				brandList: res.data.data
			})
			console.log(res.data.data)
		})

		wx.pro.request({
			url: app.globalData.uri + 'Index/cateList',
			data: {
				pid: 0
			},
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			that.setData({
				nav: res.data.data
			})
			that.getGoods(that, res.data.data[0].cate_id)
		})


	},

	getGoods(that, id) {
		wx.pro.request({
			url: app.globalData.uri + 'Index/cateList',
			data: {
				pid: id
			},
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			that.setData({
				goodsList: res.data.data
			})
		})
	},
	toDetail() {
		wx.navigateTo({
			url: '/pages/shop/goods/goods',
		})
	},
})