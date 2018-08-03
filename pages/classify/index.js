var app = getApp()
Page({
	data: {
		brandList: [],
		nav: [],
		goodsList: [],
		is_show: 1,
		curNav: '',
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
		that.setData({
			curNav: id
		})

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
		wx.$http('Index/brandList').then(res => {
			that.setData({
				brandList: res.data.data
			})
			console.log(res.data.data)
		})
		wx.$http('Index/cateList').then(res => {
			that.setData({
				nav: res.data.data
			})
			that.getGoods(that, res.data.data[0].cate_id)
		})


	},

	getGoods(that, id) {
		wx.$http('Index/cateList', {
			pid: id
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