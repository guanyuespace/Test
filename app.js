//app.js
const core=require("./utils/core.js");
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //test
    core.getPics();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    music_user: {
      id: 275438773,
      // id:123,
      nickname: "关月天人"
    },
    audioPlayer: {},
    lyricPage: 0
  }
})