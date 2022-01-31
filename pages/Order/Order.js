// pages/Order/Order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "All": "Clicked",
    "Unconfirmed": "",
    "NotShipped": "",
    "Receipt": "",
    "AfterSale": "",
    "StateOne": "block",
    "StateTwo": "block",
    "StateThree": "block",
    "StateFour": "block",
    "PreviousClick": "All",
    "AllOrders": [{
      "OrderUnique":"2333",
      "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      "State": 0,
      "Thumbnail": "../../images/commodity/images1/1.jpg",
      "BusinessName": "某某某"
    }, {
      "OrderUnique":"2333",
      "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      "State": 1,
      "Thumbnail": "../../images/commodity/images1/1.jpg",
      "BusinessName": "某某某"
    }, {
      "OrderUnique":"2333",
      "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      "State": 0,
      "Thumbnail": "../../images/commodity/images1/1.jpg",
      "BusinessName": "某某某"
    }, {
      "OrderUnique":"2333",
      "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      "State": 2,
      "Thumbnail": "../../images/commodity/images1/1.jpg",
      "BusinessName": "某某某"
    }, {
      "OrderUnique":"2333",
      "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      "State": 1,
      "Thumbnail": "../../images/commodity/images1/1.jpg",
      "BusinessName": "某某某"
    }, {
      "OrderUnique":"2333",
      "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      "State": 3,
      "Thumbnail": "../../images/commodity/images1/1.jpg",
      "BusinessName": "某某某"
    }]
  },
  OrderClick(e) {
    // let PName = this.data.PreviousClick
    // let state = 0
    // // console.log(PName)

    this.StateFn(e.target.dataset.state)

    // this.setData({
    //   [PName]:"",
    //   PreviousClick: e.target.dataset.name,
    //   [e.target.dataset.name]:"Clicked"
    // })

  },
  StateFn(name) {
    switch (name) {
      case "All":
        this.setData({
          "All": "Clicked",
          "Unconfirmed": "",
          "NotShipped": "",
          "Receipt": "",
          "AfterSale": "",
          "StateOne": "blcok",
          "StateTwo": "blcok",
          "StateThree": "blcok",
          "StateFour": "blcok",
        })
        break;
      case "daiqueren":
        this.setData({
          "All": "",
          "Unconfirmed": "Clicked",
          "NotShipped": "",
          "Receipt": "",
          "AfterSale": "",
          "StateOne": "blcok",
          "StateTwo": "none",
          "StateThree": "none",
          "StateFour": "none",
        })
        break;
      case "daifahuo":
        this.setData({
          "All": "",
          "Unconfirmed": "",
          "NotShipped": "Clicked",
          "Receipt": "",
          "AfterSale": "",
          "StateOne": "none",
          "StateTwo": "block",
          "StateThree": "none",
          "StateFour": "none",
        })
        break;
      case "daishouhuo":
        this.setData({
          "All": "",
          "Unconfirmed": "",
          "NotShipped": "",
          "Receipt": "Clicked",
          "AfterSale": "",
          "StateOne": "none",
          "StateTwo": "none",
          "StateThree": "block",
          "StateFour": "none",
        })
        break;
      case "shouhou":
        this.setData({
          "All": "",
          "Unconfirmed": "",
          "NotShipped": "",
          "Receipt": "",
          "AfterSale": "Clicked",
          "StateOne": "none",
          "StateTwo": "none",
          "StateThree": "none",
          "StateFour": "block",
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.StateFn(options.name)

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