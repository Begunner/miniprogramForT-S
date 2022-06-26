const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        alphabet:['A','B','C','D','E','F','G','H','I','J','K'],
        hid: 0,
        cid: 0,
        index: 0,
        questions: [],
        correctRates: [],
        //返回的选项
        requestChoices: []
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
              for(var i=0;i<that.data.questions.length;i++){
                wx.request({
                  url: 'http://localhost:8080/question/get-all-choices',
                      method: 'GET',
                      data:{
                        qid: that.data.questions[i].qid
                      }, 
                      success: function(res){
                        var RC = that.data.requestChoices
                        RC.push(res.data)
                        that.setData({
                          requestChoices: RC
                        })
                      }
                })
              }
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