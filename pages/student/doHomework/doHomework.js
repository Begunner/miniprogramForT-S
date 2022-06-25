const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        alphabet:['A','B','C','D','E','F','G','H','I','J','K']
    },
    onLoad (option){
      this.setData({
          index: option.homeworkIndex,
          cid: option.courseId,
          index: option.homeworkIndex
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
    }
})