// index.js
let app = getApp();
Page({
  data: {
    "All": "Clicked",
    "HomeAppliances": "",
    "HomeGoods": "",
    "DailyNecessities": "",
    "SkinCare": "",
    "Other": "",
    "StateAll": "block",
    "StateHomeAppliances": "block",
    "StateHomeGoods": "block",
    "StateDailyNecessities": "block",
    "StateSkinCare": "block",
    "StateOther": "block",
    "InputW": 720,
    "BtnDisplay": "none",
    "SearchText": [],
    "SearchTitleDisplay": "none",
    "SearchTitlePlaceholder": "搜索",
    "SearchTitleAlignCenter": "center",
    "SearchValue": "", //inputvalue
    "CommodityAll": []
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
  InputWFn() { //首次点击搜索框
    if (this.data.SearchText.length == 0) {
      //默认获取一次列表请求
      wx.request({
        url: app.AppWeb.url + '/index/OneSearch',
        method: "GET",
        success: (res) => {
           let JsonArr = res.data.Data
        for (let i = 0; i < JsonArr.length; i++) {
          for (let k = 1; k < i; k++) {
              if(JsonArr[i].CommodityName == JsonArr[k].CommodityName){
                JsonArr.splice(k)
                i++
                k++
              }
          }
        }
          this.setData({
            "SearchText": res.data.Data
          })
        }
      })
    }
    this.setData({
      "InputW": 500,
      "BtnDisplay": "inline-block",
      "SearchTitleDisplay": "block",
      "SearchTitlePlaceholder": "请输入搜索内容",
      "SearchTitleAlignCenter": "none"
    })
  },
  BtnNone() { //按下返回时清空搜索内容
    this.setData({
      "InputW": 720,
      "BtnDisplay": "none",
      "SearchTitleDisplay": "none",
      "SearchTitlePlaceholder": "搜索",
      "SearchTitleAlignCenter": "center",
      "SearchValue": "" //清空搜内容
    })
  },
  Enter(e) { //输入
    this.setData({
      "SearchValue": e.detail.value
    })

    wx.request({
      url: app.AppWeb.url + '/index/EnterSearch',
      data: {
        "EnterSearch": e.detail.value
      },
      method: "POST",
      success: (res) => {
        this.setData({
          "SearchText": res.data.Data
        })
      }
    })
  },
  Search() { //搜索

    if (this.data.SearchValue == "") {
      wx.showToast({
        title: "请输入搜索内容",
        icon: "none",
        duration: 2000
      })
      return
    }
    wx.request({
      url: app.AppWeb.url + '/index/Search',
      data: {
        "SearchValue": this.data.SearchValue
      },
      method: "POST",
      success: (res) => {
        if (res.data.Data == undefined) {
          wx.showToast({
            title: "服务器出错啦",
            icon: "none",
            duration: 2000
          })
          return
        }
        if (res.data.Data == "") {
          wx.showToast({
            title: "搜索的礼品不存在",
            icon: "none",
            duration: 2000
          })
        } else {
          let JsonArr = JSON.parse(JSON.stringify(res.data.Data)) //转换对象
          for (const key in JsonArr) { //在图片路径加上服务器地址
            JsonArr[key].Thumbnail = app.AppWeb.url + JsonArr[key].Thumbnail
          }
          this.setData({
            "CommodityAll": JsonArr,
            "SearchValue": "" //清空搜内容
          })
          this.BtnNone() //隐藏搜索模块
        }
      }
    })
  },
  SearchTitleFun(e) { //获取输入时的内容标题
    wx.request({
      url: app.AppWeb.url + "/index/SearchTitle",
      data: {
        "GiftUnique": e.currentTarget.dataset.giftunique
      },
      method: "POST",
      success: (res) => {
        let JsonArr = JSON.parse(JSON.stringify(res.data.Data)) //转换对象
        for (const key in JsonArr) { //在图片路径加上服务器地址
          JsonArr[key].Thumbnail = app.AppWeb.url + JsonArr[key].Thumbnail
        }
        this.setData({
          "CommodityAll": JsonArr,
          "SearchValue": "", //清空内容
          "SearchText": [] //清空内容
        })
        this.BtnNone() //隐藏搜索模块
      }
    })
  },
  StateFn(name) { //点击标签分类
    switch (name) {
      case "All":
        this.setData({
          "All": "Clicked",
          "HomeAppliances": "",
          "HomeGoods": "",
          "DailyNecessities": "",
          "SkinCare": "",
          "Other": "",
          "StateAll": "block",
          "StateHomeAppliances": "block",
          "StateHomeGoods": "block",
          "StateDailyNecessities": "block",
          "StateSkinCare": "block",
          "StateOther": "block",
        })
        break;
      case "jiadian":
        this.setData({
          "All": "",
          "HomeAppliances": "Clicked",
          "HomeGoods": "",
          "DailyNecessities": "",
          "SkinCare": "",
          "Other": "",
          "StateHomeAppliances": "block",
          "StateHomeGoods": "none",
          "StateDailyNecessities": "none",
          "StateSkinCare": "none",
          "StateOther": "none",
        })
        break;
      case "jiaju":
        this.setData({
          "All": "",
          "HomeAppliances": "",
          "HomeGoods": "Clicked",
          "DailyNecessities": "",
          "SkinCare": "",
          "Other": "",
          "StateHomeAppliances": "none",
          "StateHomeGoods": "block",
          "StateDailyNecessities": "none",
          "StateSkinCare": "none",
          "StateOther": "none",
        })
        break;
      case "shenghuoyongping":
        this.setData({
          "All": "",
          "HomeAppliances": "",
          "HomeGoods": "",
          "DailyNecessities": "Clicked",
          "SkinCare": "",
          "Other": "",
          "StateHomeAppliances": "none",
          "StateHomeGoods": "none",
          "StateDailyNecessities": "block",
          "StateSkinCare": "none",
          "StateOther": "none",
        })
        break;
      case "hufuchanping":
        this.setData({
          "All": "",
          "HomeAppliances": "",
          "HomeGoods": "",
          "DailyNecessities": "",
          "SkinCare": "Clicked",
          "Other": "",
          "StateHomeAppliances": "none",
          "StateHomeGoods": "none",
          "StateDailyNecessities": "none",
          "StateSkinCare": "block",
          "StateOther": "none",
        })
        break;
      case "qita":
        this.setData({
          "All": "",
          "HomeAppliances": "",
          "HomeGoods": "",
          "DailyNecessities": "",
          "SkinCare": "",
          "Other": "Clicked",
          "StateHomeAppliances": "none",
          "StateHomeGoods": "none",
          "StateDailyNecessities": "none",
          "StateSkinCare": "none",
          "StateOther": "block",
        })
        break;
    }
  },
  IndexClick(e) {
    this.StateFn(e.target.dataset.state)
  },
  onLoad() {
    wx.request({
      url: app.AppWeb.url + "/index",
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        let JsonArr = JSON.parse(JSON.stringify(res.data.Data)) //转换对象

        for (const key in JsonArr) { //在图片路径加上服务器地址 判断标题是否相同
          JsonArr[key].Thumbnail = app.AppWeb.url + JsonArr[key].Thumbnail
          
        }
        this.setData({
          "CommodityAll": JsonArr
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.request({
      url: app.AppWeb.url + "/index",
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        let JsonArr = JSON.parse(JSON.stringify(res.data.Data)) //转换对象
        for (const key in JsonArr) { //在图片路径加上服务器地址
          JsonArr[key].Thumbnail = app.AppWeb.url + JsonArr[key].Thumbnail
        }
        this.setData({
          "CommodityAll": JsonArr
        })
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗

  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息

  }
})