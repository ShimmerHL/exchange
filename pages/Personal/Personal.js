const app = getApp()
const Utils = require("../../utils/util")

Page({
  data: {
    "EnterpriseLoginAndAdd": "none",
    "EnterpriseLogin": "block",
    "EnterpriseAdd": "none",
    "AddBtnOne": "blue",
    "AddBtnTwo": "black",
    "Merchant": "",
    "Registration": "",
    "Password": "",
    "TwoPassword": "",
    "UserOpenid":""
  },
  information() {
    wx.getUserProfile({
      desc: '让我们知道你是谁',
      success: async (callback) => {
        let Appid = new Promise((res, rej) => {
          //获取唯一标识
          wx.login({
            success: (LoginRes) => {
              wx.request({
                url: app.AppWeb.url + '/Personal',
                data: {
                  Code: LoginRes.code,
                  UserName: callback.userInfo.nickName
                },
                number: 2000,
                method: "post",
                header: {
                  'content-type': 'application/json'
                },
                success: (ReqSuc) => {
                  let UserOpenid = ReqSuc.data.UserOpenid
                  if (ReqSuc.statusCode == 200) {
                    res(UserOpenid)
                    this.setData({
                      "Appid": UserOpenid
                    })
                  } else {
                    console.log("请求失败")
                    return;
                  }

                },
                fail: (ReqFail) => {
                  wx.showToast({
                    title: '登录失败请重试',
                    icon: "error",
                    duration: 1000
                  })
                }
              })
            }
          })
        })

        let AppidData = await Appid

        if (AppidData == " " || AppidData == null || AppidData == undefined) {
          wx.showToast({
            title: '登录失败请重试',
            icon: "error",
            duration: 1000
          })
          return
        }

        wx.setStorageSync('LoginStatus', "true")
        wx.setStorageSync('avatarUrl', callback.userInfo.avatarUrl)
        wx.setStorageSync('nickName', callback.userInfo.nickName)
        wx.setStorageSync('Appid', AppidData)
        this.setData({
          "LoginStatus": true,
          "avatarUrl": callback.userInfo.avatarUrl,
          "nickName": callback.userInfo.nickName
        })
      }
    })
  },
  ActionBar(e) {
    wx.reLaunch({
      "url": '/pages/Order/Order?name=' + e.currentTarget.dataset.sequence
    })
  },
  JumpEdit() {
    wx.navigateTo({
      url: '/pages/ModifySetup/ModifySetup',
    })
  },
  Customize() {
    wx.navigateTo({
      url: '/pages/CustomGifts/CustomGifts',
    })
  },
  AllRedemptionCodes() {
    wx.navigateTo({
      url: '/pages/TotalGifts/TotalGifts'
    })
  },
  //处理企业登录与窗口显示隐藏函数
  Controls(e) {
    switch (e.currentTarget.dataset.btn) {
      case "quxiao":
        this.setData({
          "EnterpriseLoginAndAdd": "none"
        })
        break;
      case "denglu":
        wx.request({
          url: app.AppWeb.url + '/EnterpriseUserLogin',
          data: {
            "Appid" : this.data.Appid,
            "Registration": this.data.Registration,
            "Password": this.data.Password
          },
          method:"POST",
          header: {
            'content-type': 'application/json' 
          },
          success: (res) => {
            if(res.data.Code == 200){
              wx.setStorageSync("Merchant",res.data.Merchant)
              this.setData({
                "Merchant" : res.data.Merchant
              })
            } if (res.data.Code == 406 && res.data.mgs == "AppidError") {
              wx.showToast({
                title: '登录异常请重新登陆',
                icon:"none",
                duration:2000
              })
            } if (res.data.Code == 406 && res.data.mgs == "RegistrationError") {
              wx.showToast({
                title: '账号或密码不正确请重新登陆',
                icon:"none",
                duration:2000
              })
            } if (res.data.Code == 406 && res.data.mgs == "Error") {
              Utils.ShowToastErr()
            }

          }
        })

        this.setData({
          "EnterpriseLoginAndAdd": "none"
        })
        break;
      case "zhuce":
        this.setData({
          "EnterpriseLoginAndAdd": "none"
        })
        break;
      case "zhucejiemian":
        this.setData({
          "EnterpriseLogin": "none",
          "EnterpriseAdd": "block",
          "AddBtnOne": "black",
          "AddBtnTwo": "blue"
        })
        break;
      case "woshiqiyezhanghu":
        this.setData({
          "EnterpriseLoginAndAdd": "block",
          "EnterpriseLogin": "block",
          "EnterpriseAdd": "none",
          "AddBtnOne": "blue",
          "AddBtnTwo": "black"
        })
        break;
    }
  },
  EnterpriseUserLogin(e) {
    switch (e.currentTarget.dataset.name) {
      case "Registration":
        this.setData({
          "Registration": e.detail.value
        })
        break;
      case "Password":
        this.setData({
          "Password": e.detail.value
        })
        break;
    }

  },
  AddEnterpriseUser(e) {
    switch (e.currentTarget.dataset.name) {
      case "Registration":
        this.setData({
          "Registration": e.detail.value
        })
        break;
      case "Password":
        this.setData({
          "Password": e.detail.value
        })
        break;
      case "TwoPassword":
        this.setData({
          "Password": e.detail.value
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#1b90da'
    })

    wx.getStorage({
      key: "LoginStatus",
      success: (res) => {
        this.setData({
          "LoginStatus": res.data
        })
      },
      fail: () => {
        this.setData({
          "nickName": ""
        })
      }
    })
    wx.getStorage({
      key: "avatarUrl",
      success: (res) => {
        this.setData({
          "avatarUrl": res.data
        })
      },
      fail: () => {
        this.setData({
          "avatarUrl": ""
        })
      }
    })
    wx.getStorage({
      key: "nickName",
      success: (res) => {
        this.setData({
          "nickName": res.data
        })
      },
      fail: () => {
        this.setData({
          "nickName": ""
        })
      }
    })
    wx.getStorage({
      key: "Appid",
      success: (res) => {
        this.setData({
          "Appid": res.data
        })
      },
      fail: () => {
        this.setData({
          "LoginStatus": false
        })
      }
    })
    wx.getStorage({
      key: "Merchant",
      success: (res) => {
        this.setData({
          "Merchant": res.data
        })
      },
      fail: () => {
        this.setData({
          "Merchant": ""
        })
        wx.showToast({
          title: '商家状态错误请重新登录',
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