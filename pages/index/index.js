//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Start',
    test: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.setData({
      test: app.globalData.test
    })
  },
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
  },
  changeIt: function(e) {
    console.log("change it ..." + JSON.stringify(e));
    app.globalData.wx_user.nickName = e.detail.userInfo.nickName;
    app.globalData.wx_user.avatarUrl = e.detail.userInfo.avatarUrl;
    app.globalData.test = !app.globalData.test;
    this.setData({
      test: app.globalData.test
    })
  }
})