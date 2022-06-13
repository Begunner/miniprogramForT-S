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
    goToCW() {
        wx.navigateTo({
            url: '/pages/teacher/courseware/courseware'
        })
    },
    goToHW() {
        wx.navigateTo({
            url: '/pages/teacher/homework/homework'
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
        var cid = e.target.dataset.index;
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
        setTimeout(()=>{this.getTeacherCourse();}, 100);
    }
})