// pages/ModifySetup/ModifySetup.js
let app = getApp()
let Utils = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "AccountInformation": [{
      "Avatar": "",
      "NickName": "",
      "Sex": "0",
      "DateBirth": "",
      "Phone": "",
      "Email": ""
    }],
    "Avatar": "",
    "NickName": "",
    "Sex": "",
    "SexChange": "",
    "SexRange": ["保密", "男", "女"],
    "DateBirth": "",
    "DateBirthChange": "",
    "Phone": "",
    "NameChange": "",
    "PhoneChange": "",
    "EmailChange": "",
    "Appid": ""
  },
  ShowToastSuccess() {
    wx.showToast({
      title: '修改成功',
      icon: "success",
      duration: 2000,
      mask: true
    })
  },
  ShowToastError() {
    wx.showToast({
      title: '修改失败',
      icon: "error",
      duration: 2000,
      mask: true
    })
  },
  BindChange(e) { //性别 出生年月选择器
    switch (e.target.dataset.change) {
      case "Sex":
        this.setData({
          Sex: e.detail.value
        })
        wx.request({
          url: app.AppWeb.url + '/ModifySetup/ReviseSex',
          data: {
            Sex: this.data.Sex
          },
          method: "POST",
          success: (res) => {
            if (res.data.Code == 200) {
              this.setData({
                SexChange: e.detail.value
              })
              wx.showToast({
                title: '修改性别成功',
                icon: "success",
                duration: 2000,
                mask: true
              })
            } else {
              wx.showToast({
                title: '修改性别失败',
                icon: "error",
                duration: 2000,
                mask: true
              })
              this.setData({
                Sex: this.data.Sexchange
              })
            }
          }
        })
        break;
      case "DateBirth":
        this.setData({
          DateBirth: e.detail.value
        })
        wx.request({
          url: app.AppWeb.url + '/ModifySetup/DateBirth',
          data: {
            DateBirth: this.data.DateBirth
          },
          method: "POST",
          success: (res) => {
            if (res.data.Code == 200) {
              this.setData({
                DateBirthChange: e.detail.value
              })
              wx.showToast({
                title: '修改出生年月成功',
                icon: "success",
                duration: 2000,
                mask: true
              })
            } else {
              wx.showToast({
                title: '修改出生年月失败',
                icon: "error",
                duration: 2000,
                mask: true
              })
              this.setData({
                DateBirth: this.data.DateBirthchange
              })
            }
          }
        })
        break;
    }
  },
  NameInput(e) { //用户名格式
    let value = e.detail.value

    if (value.length > 16) {
      wx.showModal({
        title: '名字长度不能超过16个字符',
        complete: () => {
          this.setData({
            NameChange: this.data.NickName
          })
        }
      })
      return;
    }

    wx.request({
      url: app.AppWeb.url + '/ModifySetup/ReviseNickName',
      data: {
        NickName: value
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        if (res.data.Code == 200) {
          this.ShowToastSuccess()
          this.setData({
            NameChange: value,
            NickName: value
          })
        } else {
          this.setData({
            NameChange: this.data.NickName
          })
          this.ShowToastError()
        }
      },
      fail: (res) => {
        this.setData({
          NameChange: this.data.NameChange,
          NickName: this.data.NickName
        })
        this.ShowToastError()
      }
    })

  },
  PhoneInput(e) { //电话格式
    let value = e.detail.value

    if (!Utils.Reg_Phone(value)) {
      wx.showModal({
        title: '电话格式不正确',
        complete: () => {
          this.setData({
            PhoneChange: this.data.Phone
          })
        }
      })
      return;
    }
    wx.request({
      url: app.AppWeb.url + '/ModifySetup/RevisePhone',
      data: {
        Phone: value
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        if (res.data.Code == 200) {
          this.ShowToastSuccess()
          this.setData({
            Phone: value,
            PhoneChange: value
          })
        } else {
          this.setData({
            PhoneChange: this.data.Phone
          })
          this.ShowToastError()
        }
      },
      fail: (res) => {
        this.setData({
          PhoneChange: this.data.Phone,
        })
        this.ShowToastError()
      }
    })
  },
  EmailInput(e) { // 邮箱格式
    let value = e.detail.value

    if (!Utils.reg_Email(value)) {
      wx.showModal({
        title: '邮箱格式不正确',
        complete: () => {
          this.setData({
            PhoneChange: this.data.Phone
          })
        }
      })
      return;
    }
    wx.request({
      url: app.AppWeb.url + '/ModifySetup/ReviseEmail',
      data: {
        Email: value
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        if (res.data.Code == 200) {
          this.ShowToastSuccess()
          this.setData({
            Email: value,
            EmailChange: value
          })
        } else {
          this.setData({
            EmailChange: this.data.Email
          })
          this.ShowToastError()
        }
      },
      fail: (res) => {
        this.setData({
          EmailChange: this.data.Email,
        })
        this.ShowToastError()
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
    this.setData({
      "Appid": wx.getStorageSync('Appid'),
      "Avatar": wx.getStorageSync('avatarUrl')
    })
    wx.request({
      url: app.AppWeb.url + '/ModifySetup',
      data: {
        "Appid": this.data.Appid
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: (SucRes) => {
        let Data = SucRes.data.Data[0]
        this.setData({
          AccountInformation: SucRes.data.Data,
          NickName: Data.NickName,
          NameChange: Data.NickName,
          Phone: Data.Phone,
          PhoneChange: Data.Phone,
          Sex: Data.Sex,
          SexChange: Data.Sex,
          DateBirth: Data.DateBirth,
          DateBirthChange: Data.DateBirth,
          Email: Data.Email,
          EmailChange: Data.Email
        })
        wx.hideLoading()
      },
      fail: (FailRes) => {
        console.log("获取AccountInformation出错啦")
      }
    })

    if (this.data.AccountInformation.length == 0) { //没有数据则获取本地
      console.log("获取了本地数据")
      this.setData({
        Avatar: wx.getStorageSync('avatarUrl'),
        NickName: wx.getStorageSync('nickName'),
        NameChange: wx.getStorageSync('nickName'),
        Phone: this.data.AccountInformation[0].Phone,
        PhoneChange: this.data.AccountInformation[0].Phone,
        Appid: wx.getStorageSync('Appid'),
      })
      wx.hideLoading()
    }


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