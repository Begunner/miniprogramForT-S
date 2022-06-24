const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        hid: 0,
        cid: 0,
        index: 0,
        questions: [],
        correctRates: []
    },
    onLoad (option){
      this.setData({
          cid: option.courseId,
          index: option.homeworkIndex
      })
      this.requestQuestions();
    },
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
              that.requestRate(res.data[that.data.index].hid)
            }
        })
    },
    requestRate: function(HID) {
      let that=this;
        wx.request({
            url: 'http://localhost:8080/homework/get-right-rate',
            method: 'GET',
            data:{
              hid: HID
            },
            success: function(res){
              console.log(res.data)
              that.setData ({
                correctRates:res.data
              })
            }
        })
    }
})