const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        cid: 0,
        index: 0,
        questions: {}
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
      
    }
})