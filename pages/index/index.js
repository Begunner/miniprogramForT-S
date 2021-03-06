const app = getApp()

import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"

Page({
  data: {
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), 
    username: '点击修改姓名',
    isShowInput: false
  },
  loginHomeworkAssistant(Account){
    let that=this;
    wx.request({
      url: 'http://localhost:8080/user/add',
      method: 'POST',
      data:{
        account: Account
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res){
        app.globalData.uid = res.data
        //请求name
        wx.request({
            url: 'http://localhost:8080/user/get-by-id',
            method: 'GET',
            data:{
              uid: app.globalData.uid
            },
            success: function(res){
              app.globalData.username = res.data.name
              that.setData({
                username: app.globalData.username
              })
            }
        })
      }
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        this.loginHomeworkAssistant(res.userInfo.nickName);
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  goToTea(){
    wx.navigateTo({
      url: '/pages/teacher/teacherCourse/teacherCourse',
    })
  },
  goToStu(){
    wx.navigateTo({
      url: '/pages/student/studentCourse/studentCourse',
    })
  },
  changeName(){
    this.setData({
      isShowInput:true
    })
  },
  bindKeyInput: function(e) {
    app.globalData.username = e.detail.value
  },
  add(){
    this.setData({
      isShowInput:false
    })
    var that=this
    wx.request({
      url: 'http://localhost:8080/user/change-name',
      method: "POST",
      data:{
        uid: app.globalData.uid,
        name: app.globalData.username
      }
    })
  }
})
