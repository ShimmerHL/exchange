const formatTime = date => {  //获取年月日时分秒
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

let JsonObj = (json)=>{
  return JSON.parse(JSON.stringify(json))
}

module.exports = {
  formatTime,JsonObj
}
