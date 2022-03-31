// app.js
App({
  // onLaunch() {
  //   // 展示本地存储能力
  //   const logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       console.log(res)
  //     }
  //   })
  // },
  // globalData: {
  //   userInfo: null
  // },
  AppWeb: {
   url:"http://localhost:3000",
   //url:"https://www.shimmerhl.top",
  }
})
