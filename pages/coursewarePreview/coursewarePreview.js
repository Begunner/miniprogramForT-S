// pages/coursewarePreview/coursewarePreview.js
Page({
  data: {
    cwid:0,
    cwName:""
  },
  onLoad(options) { //options里有cwid和cwName
    this.setData({
      cwid:options.cwid,
      cwName:options.cwName
    })
    //TODO加载课件预览
  },
})