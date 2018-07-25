const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "Page animation",
    animation: '',
    pinpai: [{
        name: '香奈儿',
        is: false
      },
      {
        name: '路易斯威登',
        is: false
      },
      {
        name: '爱马仕',
        is: false
      },
      {
        name: '普拉多',
        is: false
      },
      {
        name: '古奇',
        is: false
      },
      {
        name: '赛琳',
        is: false
      },
      {
        name: '巴黎世家',
        is: false
      },
      {
        name: '蔻依',
        is: false
      },
    ],
    pinlei: [{
        name: '单肩包',
        is: false
      },
      {
        name: '手提包',
        is: false
      },
      {
        name: '双肩包',
        is: false
      },
      {
        name: '斜挎包',
        is: false
      },
      {
        name: '钱包',
        is: false
      },
      {
        name: '手包',
        is: false
      },
    ],
    xinjiu: [{
        name: '全新',
        is: false
      },
      {
        name: '99成新',
        is: false
      },
      {
        name: '95成新',
        is: false
      },
      {
        name: '9成新',
        is: false
      },
    ],
    isfq: [{
        name: '有降价',
        is: false
      },
      {
        name: '支持分期',
        is: false
      },
    ],
    form_obj: {
      // pinpai: '',
      // pinlei: '',
      // xinjiu: '',
      // isfq: '',
      // zdj: '',
      // zgj: '',
    },
    sortId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      options
    })
    that.getObjs(that, options.brand_id, 0)
  },
  bindinput(e) {
    console.log(e.detail.value)
  },
  getObjs(that, brand_id, sort) {
    wx.pro.request({
      url: app.globalData.uri + 'Goods/getList',
      data: {
        brand_id: brand_id,
        sort: sort
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      that.setData({
        objs: res.data.data
      })
      console.log(res.data.data)
    })
  },
  sort(e) {
    let that = this;
    console.log(e.currentTarget.dataset.sort);
    let sortId = e.currentTarget.dataset.sort;
    switch (sortId * 1) {
      case 0:
        console.log(sortId)
        that.getObjs(that, that.data.options.brand_id, sortId)
        that.setData({
          sortId: 0
        })
        break;
      case 1:
        console.log(sortId)
        that.getObjs(that, that.data.options.brand_id, sortId)
        that.setData({
          sortId: 2
        })
        break;
      case 2:
        console.log(sortId)
        that.getObjs(that, that.data.options.brand_id, sortId)
        that.setData({
          sortId: 1
        })
        break;
      case 10:
        console.log(sortId)
        that.getObjs(that, that.data.options.brand_id, sortId)
        that.setData({
          sortId: 11
        })
        break;
      case 11:
        console.log(sortId)
        that.getObjs(that, that.data.options.brand_id, sortId)
        that.setData({
          sortId: 10
        })
        break;
      default:
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 300,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 0,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      success: function (res) {
        console.log(res)
      }
    })
  },

  filtrate(e) {
    this.animation.translateX(-100 + '%').step()
    // this.animation.rotate(150).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  filtrateEnd() {

    this.animation.translateX(0).step()
    // this.animation.rotate(150).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  zdj(e) {
    let form_obj = this.data.form_obj;
    form_obj.zdj = e.detail.value;
    this.setData({
      form_obj
    })
  },
  zgj(e) {
    let form_obj = this.data.form_obj;
    form_obj.zgj = e.detail.value;
    this.setData({
      form_obj
    })
  },

  /**
   *选择品类封装函数
   *
   * @param {name} 传入需要筛选的种类
   */
  ispl(e) {
    let id = e.currentTarget.dataset.id; //获取id
    let cls = e.currentTarget.dataset.cls; //获取哪一个种类
    let leixing = this.data[cls]; //获取种类内容
    let form_obj = this.data.form_obj;
    leixing.forEach(e => {
      e.is = false /* 排他 */
    });
    form_obj[cls] = leixing[id].name;
    leixing[id].is = true; //改变状态
    this.setData({
      [cls]: leixing,
      form_obj
    })
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