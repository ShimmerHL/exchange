// pages/CheckDetails/CheckDetails.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      "FormInformation":[],
      // [{
      //   "OrderUnique":"1234567891234567789",
      //   "StatusInformation":"商家已发货,正在通知快递取件",
      //    "StateTime":"2021-11-10 15:00:14",
      //   "Receiver":"xxx",
      //   "Phone":"12345678900",
      //   "RegionAndAddress":"广东省 广州市 海珠区",
      //   "CommodityFunllName": "ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
      // "Thumbnail": "../../images/commodity/images1/1.jpg",
      // "BusinessName": "某某某",
      // "OrderTime":"2021-11-10 15:18:56"
      // }]
  },
  AfterSales(e){ // 申请售后
    wx.request({
      url: app.AppWeb.url + "/CheckDetails/AfterSales",
      data: {
        OrderUnique: e.currentTarget.dataset.orderunique
      },
      method: "POST",
      success: (res) => {
        wx.reLaunch({
          url: '/pages/Order/Order',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.AppWeb.url +  '/CheckDetails',
      data:{
        OrderUnique: options.OrderUnique
      },
      method: "POST",
      success:(res)=>{
        let JsonArr = JSON.parse(JSON.stringify(res.data.Data)) //转换对象
          for (const key in JsonArr) { //在图片路径加上服务器地址
            JsonArr[key].Thumbnail = app.AppWeb.url + JsonArr[key].Thumbnail
            JsonArr[key].OrderTime = JsonArr[key].OrderTime.split("T").join(" ").slice(0,19);
            JsonArr[key].StateTime = JsonArr[key].StateTime.split("T").join(" ").slice(0,19);
          }
          console.log(JsonArr)
        this.setData({
          "FormInformation": JsonArr
        })
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