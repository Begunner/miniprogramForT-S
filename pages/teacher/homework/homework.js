const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        //测试用数据
        homeworks:[
            {date:"5月27日",hwInThisDay:[{name:"作业1"},{name:"作业2"}]},
            {date:"5月26日",hwInThisDay:[{name:"作业1"}]},
            {date:"5月25日",hwInThisDay:[{name:"作业1"}]},
            {date:"5月24日",hwInThisDay:[{name:"作业1"}]}
        ],
        //实际数据
        homeworkList:[],
        cid: 0
    },

    onLoad (option){
        this.cid = option.courseId

        let that=this;
        wx.request({
            url: 'http://localhost:8080/homework/get',
            method: 'GET',
            data:{
              cid: that.cid,
              date: "",
              uid: 2
            },
            success: function(res){
              that.setData({
                homeworkList: res.data
              })
            }
        })
    },

    add(){
        //添加作业
    },

    setHomework: function (e) {
        var index = e.target.dataset.index;
        wx.redirectTo({
            url: '/pages/teacher/setHomework/setHomework?homeworkIndex=' + (index+1)
                  + '&courseId=' + this.cid
        })
    },
    
    seeStatics(){
        wx.navigateTo({
            url: '/pages/teacher/HwStatics/HwStatics',
        })
    }
})