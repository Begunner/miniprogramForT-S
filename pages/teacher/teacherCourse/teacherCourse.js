const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        //测试用数据
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        courses:[{cid:0,courseName:"体育",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"},
                 {cid:1,courseName:"数学",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"}], 
        //实际用数据
        addCourse: false,
        resData: {}
    },
    
    goToHW: function (e) {
        var cid = e.target.dataset.index;
        wx.redirectTo({
            url: '/pages/teacher/homework/homework?courseId=' + cid
        })
    },
    getTeacherCourse() {
        let that=this;
        wx.request({
            url: 'http://localhost:8080/course/get-by-teacher',
            method: 'GET',
            data:{
              uid: 2
            },
            success: function(res){
              that.setData({
                  resData: res.data
              })
            }
        })
    },
    onLoad() {
        this.getTeacherCourse();
    },
    addCourse(){
        this.setData({
            addCourse: true
        })
    },
    postTeacherCourse: function(newName){
        //创建新课程
        wx.request({
            url: 'http://localhost:8080/user/create',
            method: 'POST',
            data:{
              uid: 2,
              name: newName
            }
        })
    },
    submitNewCourse: function (e){
        var newName = e.detail.value.courseName;
        this.postTeacherCourse(newName);
        //重新返回课程信息
        setTimeout(()=>{this.getTeacherCourse();}, 100);
        this.setData({
            addCourse: false
        })
    },
    deleteCourse: function (e) {
        let that=this;
        var cid = e.target.dataset.index;
        wx.showModal({
            title: '提示',
            content: '确定要删除这个课程吗？',
            success (res) {
              if (res.confirm) {
                wx.request({
                    url: 'http://localhost:8080/course/delete',
                    method: "DELETE",
                    data:{
                      courseID: cid
                    },
                    header:{
                      "content-type":"application/x-www-form-urlencoded"
                    }
                  })
                setTimeout(()=>{that.getTeacherCourse();}, 100);
              }
            }
          })
    },
    selectCode:function(e){
        var cid = e.target.dataset.index;
        wx.showModal({
            title: '提示',
            content: '该课程的选课码是：' + cid
        })
    }
})