// pages/RedemptionCode/RedemptionCode.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "OrderUnique": "",
    "RedemptionCode": []
    // [{
    //   Code:""8BvNZKXmifnka31y"",
    //   Used:"0"
    // }]
  },
  CopyQRCode(e) {
    wx.setClipboardData({
      data: this.data.RedemptionCode[e.currentTarget.dataset.key].Code,
      fail(res) {
        wx.showToast({
          title: '复制失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载动画
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.AppWeb.url + '/RedemptionCode',
      data: {
        'GiftUnique': options.GiftUnique
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: (ReqRes) => {
        console.log( ReqRes.data.Data)
        this.setData({
          "RedemptionCode": ReqRes.data.Data
        })
        //关闭加载动画
        wx.hideLoading()
      }
    })
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