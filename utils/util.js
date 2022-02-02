//获取年月日时分秒
const formatTime = date => {  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
//Json转换
let JsonObj = (json)=>{
  return JSON.parse(JSON.stringify(json))
}

let ShowToastErr = ()=>{
  wx.showToast({
    title: '服务器错误',
    icon:"none",
    duration:2000
  })
}

module.exports = {
  formatTime,JsonObj,ShowToastErr
}
