// pages/Details/Details.js
let app = getApp()
let Utils = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  /**
   * onShareAppMessage 分享
   */
  data: {
    onShareAppMessage(res) {
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
    "Appid": wx.getStorageSync('Appid'),
    "GiftUnique":"",
    "IntroduceImgOne": "",
    "CommodityFunllName": "",
    "InputPageBoxDisplay": "none",
    "InputPageCOlor": "",
    "Commodity": [],
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
    "RedemptionCode": "", //兑换码
    "Receiver": "", //收货人
    "Phone": "", //手机号
    "Region": ['广东省', '广州市', '海珠区'],
    "Address": "", //详细地址
    "OrderTime": "", //下单时间
  },
  Exchange() { //点击兑换按钮
    //获取封面第一张图片和礼品全名
    this.setData({
      "IntroduceImgOne": this.data.Commodity[0].CarouselPictures[0],
      "CommodityFunllName": this.data.Commodity[0].CommodityFunllName
    })
    //点击兑换button显示填写信息界面
    this.animate("#InputPage",
      [{
          bottom: "-100%"
        },
        {
          bottom: "0%"
        }
      ],
      300, () => {
        this.setData({
          InputPageCOlor: "rgba(000,000,000,.7)"
        })
      })

    this.setData({
      IntroduceImgOne: this.data.Commodity[0].IntroduceImg[0],
      "InputPageBoxDisplay": "block",
    })
  },
  HowHide() {//点击黑色区域或者叉号影藏填写信息界面
    this.setData({
      "InputPageCOlor": "",
      "IntroduceImgOne": "",
      "InputPageBoxPostion": "-100%",
      "InputPageBoxDisplay": "none"
    })
  },
  InputModule(e) {//三级联动
    this.setData({
      "Region": e.detail.value
    })
  },
  FormInformation(e) {//获取表单信息
    let Time = new Date().toLocaleDateString().split("/").join("-") + " " + new Date().toTimeString().slice(0, 8)
    switch (e.target.dataset.name) {
      case "duihuanma":
        this.setData({
          RedemptionCode: e.detail.value,
          OrderTime: Time
        })
        break;
      case "shouhuoren":
        this.setData({
          Receiver: e.detail.value,
          OrderTime: Time
        })
        break;
      case "shoujihaoma":
        this.setData({
          Phone: e.detail.value,
          OrderTime: Time
        })
        break;
      case "xinagxidizhi":
        this.setData({
          Address: e.detail.value,
          OrderTime: Time
        })
        break;

    }
  },
  SubmitBtn() {  //提交表单
    if(this.data.RedemptionCode == "" || this.data.Receiver == ""|| this.data.Phone == ""|| this.data.Region == ""){
      wx.showToast({
        title: '请填写完对应的信息',
        icon: "none",
        duration: 2000
      })
      return
    }if(this.data.Receiver.length >= 26){
      wx.showToast({
        title: '接收者姓名过长',
        icon: "error",
        duration: 2000
      })
      return
    }
    if(!Utils.Reg_Phone(this.data.Phone)){
      wx.showToast({
        title: '手机格式不正确',
        icon: "error",
        duration: 2000
      })
      return
    }
    wx.request({
      url: app.AppWeb.url + '/Details/Submit',
      data: {
        Appid: this.data.Appid,
        GiftUnique: this.data.GiftUnique,
        RedemptionCode: this.data.RedemptionCode, 
        Receiver: this.data.Receiver, 
        Phone: this.data.Phone, 
        Region: this.data.Region.join(" "),
        Address: this.data.Address, 
        OrderTime: this.data.OrderTime, 
      },
      method: "POST",
      success: (res) => {
        if(res.data.Code !== 200){
          wx.showToast({
            title: '兑换码不正确或已使用或企业不对',
            icon:"none",
            duration: 3000
          })
          return
        }
      wx.navigateTo({
        url: `/pages/CheckDetails/CheckDetails?OrderUnique=${res.data.Data[0].OrderUnique}`
      })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.AppWeb.url + '/Details',
      data: {
        GiftUnique: options.GiftUnique
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        //console.log(res.data)
        let json = Utils.JsonObj(res.data)
        //去除空值
        for (let i = 0; i < json.CarouselPictures.length; i++) {
          if (json.CarouselPictures[i] == " ") {
            json.CarouselPictures.splice(i)
          } else {
            json.CarouselPictures[i] = app.AppWeb.url + json.CarouselPictures[i]
          }

        }
        for (let i = 0; i < json.IntroduceImg.length; i++) {
          if (json.IntroduceImg[i] == " ") {
            json.IntroduceImg.splice(i)
          } else {
            json.IntroduceImg[i] = app.AppWeb.url + json.IntroduceImg[i]
          }

        }
        this.setData({
          "Commodity": [json],
          "GiftUnique": options.GiftUnique
        })
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