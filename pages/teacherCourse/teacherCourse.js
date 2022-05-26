// pages/teacherCourse/teacherCourse.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cid:0
  },
  onLoad(options) {
    this.setData({
      cid:options.cid
    })
  },
  toTheCourseware(){
    var that=this
    wx.navigateTo({
      url: `/pages/teacherCourseware/teacherCourseware?cid=${that.cid}`,
    })
  },
  toTheHomework(){
    var that=this
    wx.navigateTo({
      url: `/pages/teacherHomework/teacherHomework?cid=${that.cid}`,
    })
  },

})