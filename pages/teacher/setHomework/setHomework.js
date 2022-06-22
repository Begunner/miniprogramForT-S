const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        cid: 0,
        index: 0,
        questions: []
    },

    onLoad (option){
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
              uid: 2
            },
            success: function(res){
              console.log(res.data[option.homeworkIndex-1].questions)
              that.setData({
                questions: res.data[option.homeworkIndex-1].questions
              })
            }
        })
    }
})