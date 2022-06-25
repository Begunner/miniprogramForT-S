const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        alphabet:['A','B','C','D','E','F','G','H','I','J','K'],
        cid: 0,
        hid: 0,
        questions: [],
        answers: {51:"你的回答很重要"}
    },
    onLoad (option){
      this.setData({
          index: option.homeworkIndex,
          cid: option.courseId
      })
      this.requestQuestions();
    },
    fakeCallback(){},
    requestQuestions: function() {
      let that=this;
        wx.request({
            url: 'http://localhost:8080/homework/get',
            method: 'GET',
            data:{
              cid: that.data.cid,
              date: "",
              uid: app.globalData.uid
            },
            success: function(res){
              that.setData ({
                questions: res.data[that.data.index].questions,
                hid: res.data[that.data.index].hid
              })
            }
        })
    },
    submitHomework(){
      let that = this
      wx.request({
        url: 'http://localhost:8080/homework/submit',
        method: 'POST',
        data:{
          hid: that.data.hid,
          uid: app.globalData.uid,
          answers: that.data.answers
        },
        header: {
          "Content-Type": "application/json"
        }
    })
      wx.redirectTo({
        url: '/pages/student/homework/homework?courseId=' + that.data.cid
      })
    }
})