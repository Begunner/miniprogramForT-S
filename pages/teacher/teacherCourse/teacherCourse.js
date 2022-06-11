const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        //测试用数据
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        courses:[{cid:0,courseName:"体育",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"},
                 {cid:1,courseName:"数学",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"}], 
        defaultUid: 2,
        //返回数据
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
    onLoad() {
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
              console.log(res.data)
            }
          })
    }
})