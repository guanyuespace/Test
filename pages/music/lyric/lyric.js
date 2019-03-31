// pages/music/music_lyric/music_lyric.js
const app = getApp();
const core = require("../../../utils/core.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lyricid: 0,
    lyricname: "",
    lyric_str: "",
    lyric_url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("lyric onLoad options=" + JSON.stringify(options));
    //init
    this.setData({
      lyricid: options.id,
      lyricname: options.name
    }, () => {

    });

    //获取歌词信息
    core.getLyric(this.data.lyricid,this);

    //获取歌曲URL
    core.getCachedMusic(this.data.lyricid,this);
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
  play: function() {
    app.globalData.audioPlayer.play();
  },
  pause: function() {
    app.globalData.audioPlayer.pause();
  },
  stop: function() {
    app.globalData.audioPlayer.stop();
  },
  back: function() {
    wx.navigateBack({
      delta: 1,
    })
  }
})