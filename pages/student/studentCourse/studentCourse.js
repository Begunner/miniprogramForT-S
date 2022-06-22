const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        //测试用数据
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        courses:[{cid:0,courseName:"体育",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"},
                 {cid:1,courseName:"数学",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"}], 
        //实际用数据
        joinCourse: false,
        resData: {}
    },
    goToHW: function (e) {
        var cid = e.target.dataset.index;
        wx.redirectTo({
            url: '/pages/student/homework/homework?courseId=' + cid
        })
    },
    getStudentCourse() {
        let that=this;
        wx.request({
            url: 'http://localhost:8080/course/get-by-student',
            method: 'GET',
            data:{
              uid: app.globalData.uid
            },
            success: function(res){
              that.setData({
                  resData: res.data
              })
            }
        })
    },
    onLoad() {
        this.getStudentCourse();
    },
    joinCourse(){
        this.setData({
            joinCourse: true
        })
    },
    postStudentCourse: function(Cid){
        //创建新课程
        wx.request({
            url: 'http://localhost:8080/user/join-as-student',
            method: 'POST',
            data:{
              uid: app.globalData.uid,
              cid: Cid
            }
        })
    },
    submitNewCourse: function (e){
        var Cid = e.detail.value.courseId;
        this.postStudentCourse(Cid);
        //重新返回课程信息
        setTimeout(()=>{this.getStudentCourse();}, 100);
        this.setData({
            joinCourse: false
        })
    }
})