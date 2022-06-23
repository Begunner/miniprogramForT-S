const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"
var util = require('../../../utils/util.js')

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
    },

    addHomework(){
        let that = this;
        wx.request({
            url: 'http://localhost:8080/homework/add',
            method: 'POST',
            data:{
              courseID: that.cid,
              dateStr: new Date(),
              courseName: "default"
            }
        })
        setTimeout(()=>{this.requestHomework();}, 100);
    },

    deleteHomework: function (e) {
        let that=this;
        var hID = e.target.dataset.index;
        wx.showModal({
            title: '提示',
            content: '确定要删除这个作业吗？',
            success (res) {
              if (res.confirm) {
                wx.request({
                    url: 'http://localhost:8080/homework/delete',
                    method: "DELETE",
                    data:{
                      hid: hID
                    },
                    header:{
                      "content-type":"application/x-www-form-urlencoded"
                    }
                  })
                setTimeout(()=>{that.requestHomework();}, 100);
              }
            }
          })
    },
})