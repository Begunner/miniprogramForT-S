// pages/teacherHomework/teacherHomework.js
Page({

  data: {
    homework:[{hwid:0,hwName:"作业1",condition:"已完成",closingTime:[2022,5,30,12,0,0]},{hwid:1,hwName:"作业2",condition:"进行中",closingTime:[2022,5,30,12,0,0]}], 
  },

  onLoad(options) {
    wx.request({
      url: '',//后端地址
      data:{cid:options.cid},
      success:(res)=>{ //res格式应为homework数组

      }
    })
  },
  toTeaHwDetail(e){
    let hwid=e.currentTarget.dataset.hwid
    wx.navigateTo({
      url: `/pages/teacherHwDetail/teacherHwDetail?hwid=${hwid}`,
    })
  },
  toHwCorrection(e){
    let hwid=e.currentTarget.dataset.hwid
    wx.navigateTo({
      url: `/pages/hwCorrection/hwCorrection?hwid=${hwid}`,
    })
  },
  del(e){
    var hwid=e.currentTarget.dataset.hwid
    for(var i=0;i<this.data.homework;i++){
      if(hwid==this.data.homework[i].hwid){
        this.data.homework.splice(i,1)
      }
    }
    this.setData({
      homework:this.data.homework
    })
  },
  //TODO
  upload(){

  },
})