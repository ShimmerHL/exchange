// pages/Details/Details.js
let app = getApp()
let Util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  /**
   * onShareAppMessage 分享
   */
  data: {
    onShareAppMessage(res){
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: this.data.Commodity.CommodityName
          })
        }, 2000)
      })
      return {
        title: this.data.Commodity.CommodityFunllName,
        path: '/page/Details/Details.wxml',
        promise 
      }
    },
    "IntroduceImgOne":"",
    "InputPageBoxDisplay":"none",
    "InputPageCOlor":"",
    "Commodity":[],
    // "Commodity":[{
    //   "GiftUnique":"",
    //   "CommodityName":"蛇圣（Holy serpent）",
    //   "CommodityFunllName":"ANC智能主动降噪无线蓝牙耳机头戴式环绕隔音耳麦 【黑色】ANC降噪旗舰级音质",
    //   "CarouselPictures":[
    //     "../../images/commodity/images1/1.jpg",
    //     "../../images/commodity/images1/2.jpg",
    //     "../../images/commodity/images1/3.jpg",
    //     "../../images/commodity/images1/4.jpg",
    //     "../../images/commodity/images1/5.jpg"],
    //   "Specification":["可以","不行","很好","不错"],
    //   "BusinessName":"某某某",
    //   "IntroduceImg":[
    //     "../../images/commodity/images1/1.jpg",
    //     "../../images/commodity/images1/2.jpg",
    //     "../../images/commodity/images1/3.jpg",
    //     "../../images/commodity/images1/4.jpg",
    //     "../../images/commodity/images1/5.jpg"],
    //   "SpecificationExist":true,
    //   "Frequency":"11" ,
    //   "Remaining":"233",
    // }],
    "RedemptionCode":"",
      "Receiver":"",
      "Phone":"",
      "Region": ['广东省', '广州市', '海珠区'],
      "Address":"",
      "OrderTime":""
  },
  Exchange(){
    //点击兑换button显示填写信息界面
    this.animate("#InputPage",
    [{bottom:"-100%"},
    {bottom:"0%"}],
    300,()=>{
      this.setData({
        InputPageCOlor:"rgba(000,000,000,.7)"
      })
    })

    this.setData({
      IntroduceImgOne :  this.data.Commodity[0].IntroduceImg[0],
      "InputPageBoxDisplay":"block",
    })
  },
  HowHide(){
    //点击黑色区域或者叉号影藏填写信息界面
    this.setData({
      InputPageCOlor:"",
      IntroduceImgOne: "",
      InputPageBoxPostion : "-100%",
      "InputPageBoxDisplay":"none"
    })
  },
  InputModule(e){
      //三级联动
      this.setData({
        Region: e.detail.value
      })
  },
  FormInformation(e){
      //获取表单信息
      // console.log(e)
      let Time = new Date().toLocaleDateString().split("/").join("-")+" " + new Date().toTimeString().slice(0,8)
      switch(e.target.dataset.name){
        case "duihuanma":
          this.setData({
            RedemptionCode:e.detail.value,
            OrderTime:Time
          })
          break;
        case "shouhuoren":
          this.setData({
            Receiver:e.detail.value,
            OrderTime:Time
          })
          break;
        case "shoujihaoma":
          this.setData({
            Phone:e.detail.value,
            OrderTime:Time
          })
          break;
        case "xinagxidizhi":
          this.setData({
            Address:e.detail.value,
            OrderTime:Time
          })
          break;
        
      }
  },
  SubmitBtn(){
      wx.navigateTo({
        url: '/pages/CheckDetails/CheckDetails'
      })
  },
  formSubmit(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.GiftUnique)
    wx.request({
      url: app.AppWeb.url +  '/Details',
      data: {
        GiftUnique: options.GiftUnique
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        //console.log(res.data)
        let json = JSON.parse(JSON.stringify(res.data))
        for (let index = 0; index < json.CarouselPictures.length; index++) {
          json.CarouselPictures[index] = app.AppWeb.url + json.CarouselPictures[index] 
        }
        for (let index = 0; index < json.CarouselPictures.length; index++) {
          json.IntroduceImg[index] = app.AppWeb.url + json.IntroduceImg[index] 
        }
        this.setData({
          "Commodity" : [json]
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