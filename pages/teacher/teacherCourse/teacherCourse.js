const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        courses:[{cid:0,courseName:"体育",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"},
                 {cid:1,courseName:"数学",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"}], 
                //含有courseName,cid
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
        var app = getApp();
        console.log(app.globalData.ourUrl);
        wx.request({
            url: app.globalData.defaultUrl + '/course/get-by-teacher',
            method: 'GET',
            data:{
              uid: this.defaultUid
            },
            success: function(res){
              console.log(res.data);
            }
          })
    }
})