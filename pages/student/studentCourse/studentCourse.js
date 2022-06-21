const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        //测试用数据
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        courses:[{cid:0,courseName:"语文",teacher:"语文老师",start:"2022.5.23",end:"2023.5.23"},
                 {cid:1,courseName:"数学",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"}], 
        //实际数据
        resData: {}
    },

    goToHW() {
        wx.navigateTo({
            url: '/pages/student/homework/homework'
        })
    },
    onLoad() {
        let that=this;
        wx.request({
            url: 'http://localhost:8080/course/get-by-student',
            method: 'GET',
            data:{
              uid: 3
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