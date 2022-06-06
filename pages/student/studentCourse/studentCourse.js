const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        courses:[{cid:0,courseName:"语文",teacher:"语文老师",start:"2022.5.23",end:"2023.5.23"},
                 {cid:1,courseName:"数学",teacher:"数学老师",start:"2022.5.23",end:"2023.5.23"}], 
                //含有courseName,cid
    },
    goToSee() {
        wx.navigateTo({
            url: '/pages/student/courseware/courseware'
        })
    },
    goToDo() {
        wx.navigateTo({
            url: '/pages/student/homework/homework'
        })
    }
})