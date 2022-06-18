const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        coursewares:[
            {date:"5月27日",cwInThisDay:[{name:"课件1"},{name:"课件2"}]},
            {date:"5月26日",cwInThisDay:[{name:"课件1"}]},
            {date:"5月25日",cwInThisDay:[{name:"课件1"}]},
            {date:"5月24日",cwInThisDay:[{name:"课件1"}]}
        ]
    },

    onLoad (option){
        console.log(option.courseId)
    },
    
    goToSee(){
        wx.navigateTo({
            url: '/pages/teacher/seeCourseware/seeCourseware',
        })
    }
})