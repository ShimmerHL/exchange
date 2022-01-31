Page({
  data: {
    "EnterpriseLoginAndAdd": "none",
    "EnterpriseLogin": "block",
    "EnterpriseAdd": "none",
    "AddBtnOne":"blue",
    "AddBtnTwo":"black",
    "Merchant": 0
  },
  information() {
    wx.getUserProfile({
      desc: '让我们知道你是谁',
      success: (res) => {
        console.log(res)
        

        wx.setStorageSync('LoginStatus', "true")
        wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
        wx.setStorageSync('nickName', res.userInfo.nickName)
        this.setData({
          "LoginStatus": true,
          "avatarUrl": res.userInfo.avatarUrl,
          "nickName": res.userInfo.nickName
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
  Controls(e) {
    switch (e.currentTarget.dataset.btn) {
      case "quxiao":
        this.setData({
          "EnterpriseLoginAndAdd": "none"
        })
        break;
      case "denglu":
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
          "AddBtnOne":"black",
          "AddBtnTwo":"blue"
        })
        break;
      case "woshiqiyezhanghu":
        this.setData({
          "EnterpriseLoginAndAdd": "block",
          "EnterpriseLogin": "block",
          "EnterpriseAdd": "none",
          "AddBtnOne":"blue",
          "AddBtnTwo":"black"
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
    wx.login({
      success:(res)=>{
          console.log(res)
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