// pages/teacherHwDetail/teacherHwDetail.js
Page({
  data: {
    hwid:0,

  },
  onLoad(options) { //options包含hwid
    this.setData({
      hwid:options.hwid,
    })
    wx.request({
      url: '',//后端地址
      data:{
        hwid:options.hwid,
      },
      success:(res)=>{ //需要作业内容
        
      }
    })
  },
})