// pages/TotalGifts/TotalGifts.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "AllOrders": [],
    "Registration": wx.getStorageSync('Registration'), //企业注册号
    // [{
    //   "GiftUnique": "2333",
    //   "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
    //   "Exist": 0,
    //   "Thumbnail": "../../images/commodity/images1/1.jpg",
    // }]
  },
  RemoveGift(e) {
    wx.request({
      url: app.AppWeb.url + '/RedemptionCode/RemoveGift',
      data: {
        'GiftUnique': e.currentTarget.dataset.giftunique.GiftUnique
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: (ReqRes) => {
        //console.log(ReqRes)
      }
    })
    wx.reLaunch({
      url: '/pages/TotalGifts/TotalGifts',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let GetRegistration = wx.getStorageSync('Registration')
    //显示加载动画
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.AppWeb.url + '/TotalGifts',
      data: {
        'Registration': GetRegistration
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: (ReqRes) => {
        let JsonArr = ReqRes.data.Data
        let Exist0 = []
        let Exist1 = []
        for (const key in JsonArr) { //在图片路径加上服务器地址 和删除与未删除分类
          JsonArr[key].Thumbnail = app.AppWeb.url + JsonArr[key].Thumbnail
          if (JsonArr[key].Exist == 0) {
            Exist0.push(JsonArr[key])
          } else {
            Exist1.push(JsonArr[key])
          }
        }
        JsonArr = [...Exist0, ...Exist1]
        this.setData({
          "AllOrders": JsonArr
        })
        //关闭加载动画
        wx.hideLoading()
      }
    })
    wx.stopPullDownRefresh()
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
    this.onLoad()
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