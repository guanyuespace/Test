//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Start'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {},
  //not use here...
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  ////////set music userId
  setUserId: function(event) {
    console.log("index setUserId-click: event=" + JSON.stringify(event));
    console.log("id=" + event.detail.value);
    app.globalData.music_user.id = event.detail.value;
    app.globalData.music_user.nickname = "";
  },
  switchToMenu: function() {
    console.log("switchTab--> playlists");
    wx.switchTab({
      url: '/pages/music/playlists/playlists',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})