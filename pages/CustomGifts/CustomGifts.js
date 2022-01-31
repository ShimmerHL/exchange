// pages/CustomGifts/CustomGifts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "CarouselPictures": [],
    "CommodityName": "",
    "CommodityFunllName": "",
    "BusinessName": "",
    "IntroduceImg": [],
    "Specification": [],
  },
  CarouselPicturesAdd(e) { //轮播图片选取
    let alert = () => wx.showToast({
      title: '选择的图片总数不能大于5张',
      icon: 'none',
      duration: 2000
    })

    wx.chooseMedia({
      camera: 5,
      mediaType: "image",
      success: (s) => {
      
        if (this.data.IntroduceImg.length > 4) {
          alert() //选取的图片大于5张弹出对话框
          return
        }; 
        let Arr = [...this.data.CarouselPictures]
        let len = s.tempFiles.length > 5 ? 5 : s.tempFiles.length //每次选取的图片不能大于5张

        if(Arr.length + len > 5){
          alert()
          return
        }

        for (let i = 0; i < len; i++) {
          Arr.push(s.tempFiles[i].tempFilePath)
        }
        this.setData({
          CarouselPictures: Arr
        })
      }
    })
  },
  CarouselPicturesRemove(e) { //轮播图片删除
    let index = e.currentTarget.dataset.index
    let Arr = [...this.data.CarouselPictures]
    Arr.splice(index, 1)
    this.setData({
      CarouselPictures: Arr
    })
  },
  newforms(e) { //输入框
    if (typeof (e.currentTarget.dataset.name) == "number") { //如果是规格则执行
      let SpecificationArr = [...this.data.Specification]
      SpecificationArr[e.currentTarget.dataset.name] = e.detail.value
      this.setData({
        Specification: SpecificationArr
      })
      return //执行完后直接退出
    }
    switch (e.currentTarget.dataset.name) { //商品缩略 全名 和企业名
      case "CommodityName":
        this.setData({
          "CommodityName": e.detail.value
        })
        break;
      case "CommodityFunllName":
        this.setData({
          "CommodityFunllName": e.detail.value
        })
        break;
      case "BusinessName":
        this.setData({
          BusinessName: e.detail.value
        })
        break;
    }
  },
  TextIptAdd() { //规格行添加
    let SpecificationArr = [...this.data.Specification]
    SpecificationArr.length = SpecificationArr.length + 1
    this.setData({
      Specification: SpecificationArr
    })
  },
  TextIptRemove(e) { //规格行删除
    let index = e.currentTarget.dataset.index
    let SpecificationArr = [...this.data.Specification]
    SpecificationArr.splice(index, 1)
    this.setData({
      Specification: SpecificationArr
    })
  },
  IntroduceImgAdd(e) { //详细图添加
    let alert = () => wx.showToast({
      title: '选择的图片总数不能大于5张',
      icon: 'none',
      duration: 2000
    })
    wx.chooseMedia({
      camera: 5,
      mediaType: "image",
      success: (s) => {
        if (this.data.IntroduceImg.length > 4) {
          alert() //选取的图片大于5张弹出对话框
          return
        }; 
        let Arr = [...this.data.IntroduceImg]
        let len = s.tempFiles.length > 5 ? 5 : s.tempFiles.length //每次选取的图片不能大于5张
        
        if(Arr.length + len > 5){
          alert() 
          return
        }

        for (let i = 0; i < len; i++) {
          Arr.push(s.tempFiles[i].tempFilePath)
        }
        this.setData({
          IntroduceImg: Arr
        })
      }
    })
  },
  IntroduceImgRemove(e) { //详细图片删除
    let index = e.currentTarget.dataset.index
    let Arr = [...this.data.IntroduceImg]
    Arr.splice(index, 1)
    this.setData({
      IntroduceImg: Arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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