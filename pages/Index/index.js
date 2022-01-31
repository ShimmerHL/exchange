// index.js
let app = getApp();
Page({
  data: {
    "All": "Clicked",
    "Device": "",
    "Furniture": "",
    "Cosmetic": "",
    "Other": "",
    "StateOne": "block",
    "StateTwo": "block",
    "StateThree": "block",
    "StateFour": "block",
    "PreviousClick": "All",
    "InputW": 700,
    "BtnOpacity": 0,
    "SearchText": ["2333", "123456"],
    "SearchTitleDisplay": "none",
    "SearchTitlePlaceholder": "搜索",
    "SearchTitleAlignCenter": "center",
    "CommodityAll":[]
    // "CommodityAll": [{
    //   "GiftUnique": "",
    //   "CommodityName": "蛇圣（Holy serpent）123123123213213131231323",
    //   "Thumbnail": "../../images/commodity/images1/1.jpg",
    //   "Frequency": "11"
    // }, {
    //   "CommodityName": "蛇圣（Holy serpent）",
    //   "Thumbnail": "../../images/commodity/images1/1.jpg",
    //   "Frequency": "11"
    // }, {
    //   "CommodityName": "蛇圣（Holy serpent）",
    //   "Thumbnail": "../../images/commodity/images1/1.jpg",
    //   "Frequency": "11"
    // }]
  },
  InputWFn(e) {
    this.setData({
      "InputW": 550,
      "BtnOpacity": 1,
      "SearchTitleDisplay": "block",
      "SearchTitlePlaceholder": "请输入搜索内容",
      "SearchTitleAlignCenter": "none"
    })
  },
  BtnNone() {
    this.setData({
      "InputW": 700,
      "BtnOpacity": 0,
      "SearchTitleDisplay": "none",
      "SearchTitlePlaceholder": "搜索",
      "SearchTitleAlignCenter": "center"
    })
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
          "Device": "",
          "Furniture": "",
          "Cosmetic": "",
          "Other": "",
          "StateOne": "blcok",
          "StateTwo": "blcok",
          "StateThree": "blcok",
          "StateFour": "blcok",
        })
        break;
      case "daiqueren":
        this.setData({
          "All": "",
          "Device": "Clicked",
          "Furniture": "",
          "Cosmetic": "",
          "Other": "",
          "StateOne": "blcok",
          "StateTwo": "none",
          "StateThree": "none",
          "StateFour": "none",
        })
        break;
      case "daifahuo":
        this.setData({
          "All": "",
          "Device": "",
          "Furniture": "Clicked",
          "Cosmetic": "",
          "Other": "",
          "StateOne": "none",
          "StateTwo": "block",
          "StateThree": "none",
          "StateFour": "none",
        })
        break;
      case "daishouhuo":
        this.setData({
          "All": "",
          "Device": "",
          "Furniture": "",
          "Cosmetic": "Clicked",
          "Other": "",
          "StateOne": "none",
          "StateTwo": "none",
          "StateThree": "block",
          "StateFour": "none",
        })
        break;
      case "shouhou":
        this.setData({
          "All": "",
          "Device": "",
          "Furniture": "",
          "Cosmetic": "",
          "Other": "Clicked",
          "StateOne": "none",
          "StateTwo": "none",
          "StateThree": "none",
          "StateFour": "block",
        })
        break;
    }
  },
  // 事件处理函数
  Details(e) {

  },
  onLoad() {
    wx.request({
      url: app.AppWeb.url + "/index",
      data: {},
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        let JsonArr = JSON.parse(JSON.stringify(res.data))  //转换对象
        for (const key in JsonArr) { //在图片路径加上服务器地址
         JsonArr[key].Thumbnail = app.AppWeb.url +  JsonArr[key].Thumbnail
        }
        this.setData({
          "CommodityAll": JsonArr
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗

  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息

  }
})