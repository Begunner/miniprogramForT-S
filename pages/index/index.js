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
    nickName: 'default',
    username: 'default',
    isShowInput: false
  },
  loginHomeworkAssistant(Account){
    wx.request({
      url: 'http://localhost:8080/user/get-by-account',
      method: 'GET',
      data:{
        account: Account
      },
      success: function(res){
        app.globalData.uid = res.data.uid
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
          nickName: res.userInfo.nickName,
          username: res.userInfo.nickName,
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
    this.setData({
      username: e.detail.value
    })
  },
  add(){

    this.setData({
      isShowInput:false
    })
    var that=this
    console.log(this.username)
    wx.request({
      url: 'http://localhost:8080/user/change-name',
      method: "POST",
      data:{
        uid: app.globalData.uid,
        name: that.username
      }
    })
  }
})
