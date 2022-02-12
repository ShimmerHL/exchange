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
//电话正则效验
let Reg_Phone = phone=>{
  let Reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/

   return Reg.test(phone)
}
//邮箱正则效验
let reg_Email = Email =>{
  let Reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

  return Reg.test(Email)
}

//Json转换
let JsonObj = (json)=>{
  return JSON.parse(JSON.stringify(json))
}

let ShowToastErr = ()=>{
  wx.showToast({
    title: '服务器错误请重试',
    icon:"none",
    duration:2000
  })
}

module.exports = {
  formatTime,JsonObj,ShowToastErr,Reg_Phone,reg_Email
}
