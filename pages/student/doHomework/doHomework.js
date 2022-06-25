const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        alphabet:['A','B','C','D','E','F','G','H','I','J','K'],
        cid: 0,
        hid: 0,
        questions: [],
        answers: [],
        answer:"",
        //专门用来存input框的内容的东西
        input: ""
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
    },
    commitAnAnswer(e){
      var answs=this.data.answers
      var answer=this.data.answer
      var k=e.currentTarget.dataset.index
      answs.push({[k]:answer})
      this.setData({
        answers:answs
      })
    },
    commitString(e){
      var answs=this.data.answers
      var input = this.data.input
      var k=e.target.dataset.index
      answs.push({[k]:input})
      this.setData({
        answers:answs
      })
    },
    changeAnAnswer(e){
      var values=e.detail.value
      console.log(values)
      var str=""
      for(var i=0;i<values.length;i++){
        str+=values[i]
        str+="; "
      }
      this.setData({
        answer:str
      })
    },
    getInputValue(e){
      this.setData({
        input: e.detail.value
      })
    }
})