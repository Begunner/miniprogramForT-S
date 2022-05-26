// pages/teacherCourseware/teacherCourseware.js
Page({
  data: {
    cid:0,
    courseware:[{cwid:0,cwName:"ppt1",releasedTime:[2022,5,25,21,34,55],type:"mp4"},{cwid:1,cwName:"ppt2",releasedTime:[2022,5,25,21,34,55],type:"mp4"}], 
  },

  onLoad(options) {
    this.setData({
      cid:options.cid
    })
    
    wx.request({
      url: '',//后端地址
      data:{cid:options.cid},
      success:(res)=>{ //res格式应为courseware数组

      }
    })
  },
  toTheCwPreview(e){
    let cwid=e.currentTarget.dataset.item.cwid
    let cwName=e.currentTarget.dataset.item.cwName
    wx.navigateTo({
      url:`/pages/coursewarePreview/coursewarePreview?cwid=${cwid}&cwName=${cwName}`,
    })
  },
  //TODO
  upload(){

  }


})