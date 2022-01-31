// pages/RedemptionCode/RedemptionCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "OrderUnique":"",
    "Redemption_Url":["2333","23333","233333"]
  },
  CopyQRCode(e){
    wx.setClipboardData({
      data: this.data.Redemption_Url[e.currentTarget.dataset.key],
      fail (res) {
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
      this.setData({
        "unique": options.name
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