// pages/ModifySetup/ModifySetup.js
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
      "Email":""
    }],
    "Avatar": "",
    "NickName": "",
    "Sex": "0",
    "SexRange": ["保密", "男", "女"],
    "DateBirth": "1970-1-1",
    "Phone": "",
    "NameChange":"",
    "PhoneChange":"",
    "EmailChange":""
  },
  BindChange(e) { //性别 出生年月选择器
    switch (e.target.dataset.change) {
      case "Sex":
        this.setData({
          Sex: e.detail.value
        })
        break;
      case "DateBirth":
        this.setData({
          DateBirth: e.detail.value
        })
        break;
    }
    this.setData({
      Sex: e.detail.value
    })
  },
  NameInput(e){ //用户名格式
    let value = e.detail.value

    if(value.length > 16) {
      wx.showModal({
        title: '名字长度不能超过16个字符',
        complete:()=>{
          this.setData({
            NameChange:this.data.NickName
          })
        }
      })
      return;
    }
    this.setData({
      NameChange:value,
      NickName:value
    })
  },
  PhoneInput(e){ //电话格式
    let value = e.detail.value
    let reg_tel = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/  

    if(!reg_tel.test(value)) {
      wx.showModal({
        title: '电话格式不正确',
        complete:()=>{
          this.setData({
            PhoneChange:this.data.Phone
          })
        }
      })
      return;
    }
    this.setData({
      EmailChange:value, //修改后的电话
      Email:value
    })
  },
  EmailInput(e){
    let value = e.detail.value
    let reg_tel = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if(!reg_tel.test(value)) {
      wx.showModal({
        title: '邮箱格式不正确',
        complete:()=>{
          this.setData({
            PhoneChange:this.data.Phone
          })
        }
      })
      return;
    }
    this.setData({
      EmailChange:value, //修改后的电话
      Email:value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let JsonData = this.data.AccountInformation[0]  //存储json
    let IFNoNull = undefined || null || ""
    if (JsonData.DateBirth == IFNoNull) { //判断是否有日期 如果没有则获取本地日期作为数据
      this.setData({
        DateBirth: `${new Date().toLocaleDateString().split("/").join("-")}`
      })
    } 

    if (this.data.AccountInformation[0].Avatar == IFNoNull) { //没有数据则获取本地
      this.setData({
        Avatar: wx.getStorageSync('avatarUrl'),
        NickName: wx.getStorageSync('nickName'),
        NameChange: wx.getStorageSync('nickName'),
        Phone: this.data.AccountInformation[0].Phone,
        PhoneChange: this.data.AccountInformation[0].Phone
      })
    } else {      //json有数据则获取json
      for (const key in JsonData) {
        this.setData({
         key:JsonData[key]
       })
    }
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