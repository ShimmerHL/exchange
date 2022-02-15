const app = getApp()
const Utils = require("../../utils/util")

Page({
  data: {
    "EnterpriseLoginAndAdd": "none",
    "EnterpriseLogin": "block",
    "EnterpriseAdd": "none",
    "AddBtnOne": "blue",
    "AddBtnTwo": "black",
    "NotShippedNumber":"", //待发货数量
    "ReceiptNumber":"",  //待收货数量
    "AfterSaleNumber": "",  //售后中数量
    "Merchant": "",
    "Registration": "",
    "Password": "",
    "TwoPassword": "",
    "UserOpenid": "",
    "Appid": wx.getStorageSync('Appid'),
    "nickName": "",
    "EnterpriseUserLogin":wx.getStorageSync('EnterpriseUserLogin')

  },
  information() { //获取登录状态
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
                  let UserOpenid = ReqSuc.data.Data[0].Appid
                  if (ReqSuc.statusCode == 200) {
                    res(UserOpenid)
                    this.setData({
                      "Appid": UserOpenid,
                      "nickName": ReqSuc.data.Data[0].nickName
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
        // wx.setStorageSync('nickName', callback.userInfo.nickName)
        wx.setStorageSync('Appid', AppidData)
        this.setData({
          "LoginStatus": true,
          "avatarUrl": callback.userInfo.avatarUrl
         
        })
        
        this.onLoad()
      }
    })
  },
  ActionBar(e) { //跳转订单页面并显示全部
    wx.reLaunch({
      "url": '/pages/Order/Order?name=' + e.currentTarget.dataset.sequence
    })
  },
  JumpEdit() { //跳转用户信息页面
    wx.navigateTo({
      url: '/pages/ModifySetup/ModifySetup',
    })
  },
  Customize() { //定制礼品
    wx.navigateTo({
      url: '/pages/CustomGifts/CustomGifts',
    })
  },
  AllRedemptionCodes() { //跳转所有礼品页面
    wx.navigateTo({
      url: '/pages/TotalGifts/TotalGifts'
    })
  },

  Controls(e) { //处理企业登录与窗口显示隐藏函数
    if (this.data.Appid == "") {
      wx.showToast({
        title: '请先登录',
        icon: "error",
        duration: 2000
      })
      return
    }
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
            "Appid": this.data.Appid,
            "Registration": this.data.Registration,
            "Password": this.data.Password
          },
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            if (res.data.Code == 200) {
              wx.setStorageSync("Registration", this.data.Registration)
              wx.setStorageSync("Merchant", res.data.Merchant)
              this.setData({
                "Merchant": res.data.Merchant
              })
            }
            if (res.data.Code == 406 && res.data.mgs == "AppidError") {
              wx.showToast({
                title: '登录异常请重新登陆',
                icon: "none",
                duration: 2000
              })
            }
            if (res.data.Code == 406 && res.data.mgs == "RegistrationError") {
              wx.showToast({
                title: '账号或密码不正确请重新登陆',
                icon: "none",
                duration: 2000
              })
            }
            if (res.data.Code == 406 && res.data.mgs == "Error") {
              Utils.ShowToastErr()
            }
          }
        })

        this.setData({
          "EnterpriseLoginAndAdd": "none"
        })
        break;
      case "zhuce":
        if (this.data.Password == this.data.TwoPassword) {
          wx.request({
            url: app.AppWeb.url + '/EnterpriseUserAdd',
            data: {
              "Appid": this.data.Appid,
              "Registration": this.data.Registration,
              "Password": this.data.Password
            },
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.data.Code !== 200) {
                wx.showToast({
                  title: '该用户已存在',
                  icon: "error",
                  duration: 2000
                })
                this.setData({
                  "Registration": "",
                  "Password": "",
                  "PasswordTow": ""
                })
              } else {
                wx.setStorageSync("Registration", this.data.Registration)
                wx.setStorageSync("Merchant", res.data.Merchant)
                console.log(wx.getStorageSync('Registration'))
                this.setData({
                  "Merchant": res.data.Merchant,
                  "EnterpriseLoginAndAdd": "none"
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '输入的俩次密码不相同',
            icon: "none",
            duration: 2000
          })
        }
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
  EnterpriseUserLogin(e) { //获取填写的注册表单内容
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
  AddEnterpriseUser(e) { //注册表单
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
          "TwoPassword": e.detail.value
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //获取所需的初始信息
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
      fail: () => {}
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

    if (this.data.Appid !== "") {
      wx.request({
        url: app.AppWeb.url + '/Personal/NickName',
        data: {
          Appid: this.data.Appid
        },
        method: "POST",
        success: (res) => {
          this.setData({
            "NotShippedNumber" : res.data.Data.LogisticsStatusNum[0].NotShippedNumber,
            "ReceiptNumber" : res.data.Data.LogisticsStatusNum[0].ReceiptNumber,
            "AfterSaleNumber" : res.data.Data.LogisticsStatusNum[0].AfterSaleNumber,
            "nickName": res.data.Data.JsonNickName[0].UserName
          })
        }
      })
    }

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
        // if (this.data.Appid !== "" && this.data.Appid !== undefined && this.data.Appid !== null) {
        //   wx.showToast({
        //     title: '商家状态错误请重新登录',
        //     icon: "none",
        //     duration: 2000
        //   })
        // }
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
    this.onLoad()
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