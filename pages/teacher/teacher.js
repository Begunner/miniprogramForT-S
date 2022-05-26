// pages/teacher/teacher.js
Page({
  data: {
    courses:[{cid:0,courseName:"语文"},{cid:1,courseName:"数学"}], //含有courseName,cid
    openid:""
  },

  onLoad(options) {
  var that=this
  this.openid=wx.getStorage({
    key:"openid",
    success:(res)=>{
      that.openid=res.data
    }
  })
  wx.request({
    url: '',//后端地址
    data: {
      openid:that.openid,
    },
    success: (result) => {
      that.setData({
        courses:result.courses
      })
    },
    
    
  })
  },

  toTheCourse(e){
    let cid=e.currentTarget.dataset.cid
    wx.navigateTo({
      url: `/pages/teacherCourse/teacherCourse?cid=${cid}`,
    })
  },
  

})