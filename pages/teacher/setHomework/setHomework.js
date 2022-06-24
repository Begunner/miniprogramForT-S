const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
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
        isChoiceNotBlank: false,
        havingSetNum: false,
        choice:"",
        isAddingCho: false,
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
        isChoiceNotBlank: true,
        isChoosingType: false,
        havingChosenType: true,
      })
    },
    setTypeInput(){
      this.setData({
        isChoiceNotBlank: false,
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
        choices:cho
      })
      this.stopAdding()
    },
    notAnswer(){
      var cho=this.data.choices
      cho.push(this.data.choice)
      this.setData({
        choices:cho
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
              isChoiceNotBlank: 0,
              description: that.data.description,
              standardAnswer: that.data.answer,
              homeworkID: that.data.hid,
              choices: that.data.choices
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
        isChoiceNotBlank: false,
        havingSetNum: false,
        choice:"",
        isAddingCho: false,
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