const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
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

    onLoad (option){
        var Index = option.homeworkIndex
        this.setData({
            cid: option.courseId,
            index: option.homeworkIndex
        })
        var courseId = option.courseId
        let that=this;
        wx.request({
            url: 'http://localhost:8080/homework/get',
            method: 'GET',
            data:{
              cid: courseId,
              date: "",
              uid: app.globalData.uid
            },
            success: function(res){
              that.setData ({
                questions: res.data[Index].questions
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
      wx.request({
        url: 'url',
      })
      wx.navigateTo({
        url: 'pages/teacher/homework/homework',
      })
    }



})