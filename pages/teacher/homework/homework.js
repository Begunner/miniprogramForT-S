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
        console.log(option.courseId)
        this.cid = option.courseId

        let that=this;
        wx.request({
            url: 'http://localhost:8080/homework/get',
            method: 'GET',
            data:{
              cid: that.cid,
              date: "2022-6-11",
              uid: 2
            },
            success: function(res){
              console.log(res.data)
            }
        })
    },
    
    seeStatics(){
        wx.navigateTo({
            url: '/pages/teacher/HwStatics/HwStatics',
        })
    }
})