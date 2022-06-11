// app.js

import deviceUtil from "/miniprogram_npm/lin-ui/utils/device-util"

App({
  globalData: {
    defaultUrl: "http://localhost:8080"
  },
  /*获取Capsular高度*/
  getNavigationBarHeight() {
    const capsuleBarHeight = deviceUtil.getNavigationBarHeight()
    console.log(`CapsuleBar 的高度为${capsuleBarHeight}rpx`)
},

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: '',  //放后端服务器地址
            data: {
              code: res.code
            },
            success: (result)=>{
              //TODO 将openid存到storage中
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
