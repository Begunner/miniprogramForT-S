const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        homeworks:[
            {date:"5月27日",hwInThisDay:[{name:"作业1"},{name:"作业2"}]},
            {date:"5月26日",hwInThisDay:[{name:"作业1"}]},
            {date:"5月25日",hwInThisDay:[{name:"作业1"}]},
            {date:"5月24日",hwInThisDay:[{name:"作业1"}]}
        ],
        homeworkList: [],
        cid: 0
    },
    
    onLoad (option){
        this.cid = option.courseId; 
        this.requestHomework();
    },

    requestHomework(){
        let that=this;
        wx.request({
            url: 'http://localhost:8080/homework/get',
            method: 'GET',
            data:{
              cid: that.cid,
              date: "",
              uid: app.globalData.uid
            },
            success: function(res){
              that.setData({
                homeworkList: res.data
              })
            }
        })
    },

    doHomework: function (e) {
        var index = e.target.dataset.index;
        wx.redirectTo({
            url: '/pages/student/doHomework/doHomework?homeworkIndex=' + index
                  + '&courseId=' + this.cid
        })
    },

    goToDo(){
        wx.navigateTo({
            url: '/pages/student/doHomework/doHomework?courseId=' + this.data.cid
        })
    },

    seeAnswers: function (e) {
        var index = e.target.dataset.index;
        wx.navigateTo({
            url: '/pages/student/seeAnswers/seeAnswers?homeworkIndex=' + index + '&courseId=' + this.cid
        })
    }
})