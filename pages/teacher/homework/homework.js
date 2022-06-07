const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        homeworks:[
            {date:"5月27日",hwInThisDay:[{name:"作业1"},{name:"作业2"}]},
            {date:"5月26日",hwInThisDay:[{name:"作业1"}]},
            {date:"5月25日",hwInThisDay:[{name:"作业1"}]},
            {date:"5月24日",hwInThisDay:[{name:"作业1"}]}
        ]
    },
    
    seeStatics(){
        wx.navigateTo({
            url: '/pages/teacher/HwStatics/HwStatics',
        })
    }
})