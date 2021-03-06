// pages/music/user/user.js
const app = getApp();
const core = require("../../../utils/core.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    advisedUsers: [],
    currentOffset: 0,
    userprofileCount: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // core.getAdvisedUsers(app.globalData.userInfo.nickName ? app.globalData.userInfo.nickName : "关月", this);
    core.getAdvisedUsers(app.globalData.wx_user.nickName ? app.globalData.wx_user.nickName : "关月", this, this.data.currentOffset, 50);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.currentOffset < this.data.userprofileCount)
      core.getAdvisedUsers(app.globalData.wx_user.nickName ? app.globalData.wx_user.nickName : "关月", this, this.data.currentOffset, 50);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  setUserId: function(event) {
    console.log("event=" + JSON.stringify(event));
    if (event.currentTarget) {
      app.globalData.music_user.avatar = event.currentTarget.dataset.avatar;
      app.globalData.music_user.id = event.currentTarget.dataset.id;
      app.globalData.music_user.nickname = event.currentTarget.dataset.nickname;
    }
    wx.switchTab({
      url: '/pages/music/playlists/playlists'
    });
  },
  setUserIdInput: function(event) {
    console.log("event=" + JSON.stringify(event));
    if (event.detail.value) {
      // user_id: 275438773
      app.globalData.music_user.id = event.detail.value;
      app.globalData.music_user.nickname = "";
    }
    wx.switchTab({
      url: '/pages/music/playlists/playlists'
    });
  }
})