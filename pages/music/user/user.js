// pages/music/user/user.js
const app = getApp();
const core = require("../../../utils/core.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    advisedUsers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // core.getAdvisedUsers(app.globalData.userInfo.nickName ? app.globalData.userInfo.nickName : "关月", this);
    core.getAdvisedUsers("雪文",this);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  setUserId: function(event) {
    console.log("event=" + JSON.stringify(event));
    if (event.target) {
      app.globalData.music_user.id = event.target.dataset.id;
      app.globalData.music_user.nickname = event.target.dataset.nickname;
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