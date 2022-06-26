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
        isCreating: false,
        description: "",
        choices: [],
        answers: [],
        answer:"",
        havingSavedDescription: false,
        isChoosingType: false,
        havingChosenType: false,
        isChoiceNotBlank: 0,
        havingSetNum: false,
        choice:"",
        isAddingCho: false,
        //答案号数
        answerNumber: 0,
        //返回的选项
        requestChoices: []
    },
    fakeCallback(){},
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
    addQuestion(){
      this.setData({
        isCreating: true
      })
    },
    saveDescription(){
      this.setData({
        havingSavedDescription: true,
        isChoosingType: true
      })
    },
    setTypeSelect(){
      this.setData({
        isChoiceNotBlank: 1,
        isChoosingType: false,
        havingChosenType: true,
      })
    },
    setTypeInput(){
      this.setData({
        isChoiceNotBlank: 0,
        isChoosingType: false,
        havingChosenType: true
      })
    },
    setNumOfChoices(){
      this.setData({

      })
    },
    haveSetNum(){
      this.setData({havingSetNum:true})
    },
    isAnswer(){
      var ans=this.data.answers
      var cho=this.data.choices
      ans.push(this.data.choice)
      cho.push(this.data.choice)
      this.setData({
        answers:ans,
        choices:cho,
        answer: this.data.answer + this.data.alphabet[this.data.answerNumber] + '; ',
        answerNumber: this.data.answerNumber + 1
      })
      this.stopAdding()
    },
    notAnswer(){
      var cho=this.data.choices
      cho.push(this.data.choice)
      this.setData({
        choices:cho,
        answerNumber: this.data.answerNumber + 1
      })
      this.stopAdding()
    },
    addingCho(){
      this.setData({isAddingCho:true})
    },
    stopAdding(){
      this.setData({
        isAddingCho:false,
        choice:""
      })
    },
    commit(){
      this.setData({
        isCreating: false
      })
      let that = this
      wx.request({
        url: 'http://localhost:8080/question/add',
            method: 'POST',
            data:{
              isChoiceNotBlank: that.data.isChoiceNotBlank,
              description: that.data.description,
              standardAnswer: !that.data.isChoiceNotBlank?that.data.answer:that.data.answer.substring(0, that.data.answer.length-2),
              choices: that.data.choices,
              homeworkID: that.data.hid
            }
      })
      setTimeout(()=>{that.requestQuestions();}, 100);
      //设置提交框为默认值
      this.setData({
        description: "",
        choices: [],
        answers: [],
        answer:"",
        havingSavedDescription: false,
        isChoosingType: false,
        havingChosenType: false,
        isChoiceNotBlank: 0,
        havingSetNum: false,
        choice:"",
        isAddingCho: false,
        answerNumber: 0
      })
    },
    deleteQuestion:function(e){
      let that=this;
      var qID = e.target.dataset.index;
      wx.request({
        url: 'http://localhost:8080/question/delete',
        method: "DELETE",
        data:{
          qid: qID
        },
        header:{
          "content-type":"application/x-www-form-urlencoded"
        }
      })
    setTimeout(()=>{that.requestQuestions();}, 100);
    }
})