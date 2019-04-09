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
    lyric_url: "",
    currentTime: '00:00',
    scrollLine: 0,
    durations: '04:26',
    playFlag: false
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
    core.getLyric(this.data.lyricid, this);

    //获取歌曲URL
    core.getCachedMusic(this.data.lyricid, this);
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
    var length = 0;
    var query = wx.createSelectorQuery();
    query.select(".line").boundingClientRect((rect) => {
      length = rect.width;
    }).exec();

    setInterval(() => {
      // console.log("player: " + JSON.stringify(app.globalData.audioPlayer) + "\t" + app.globalData.audioPlayer.currentTime + " ; " + app.globalData.audioPlayer.duration);
      var curTime = app.audioPlayer.currentTime;
      var mintues = Math.floor(curTime / 60);
      var seconds = curTime - mintues * 60;
      this.setData({
        currentTime: mintues > 9 ? mintues + ":" + seconds : "0" + mintues + ":" + seconds,
        scrollLine:
      });
    }, 1000);
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
    if (!this.data.playFlag) {
      app.globalData.audioPlayer.play();
      this.setData({
        playFlag: true
      })
    } else {
      app.globalData.audioPlayer.pause();
      this.setData({
        playFlag: false
      })
    }
  },

  kuaijin: function() {
    this.data.scrollLine += 20;
    this.setData({
      scrollLine: this.data.scrollLine,
      currentTime: this.data.scrollLine
    });
    app.globalData.audioPlayer.seek(this.data.scrollLine);
  },
  kuaitui: function() {
    // this.setData
    this.data.scrollLine -= 20;
    this.setData({
      scrollLine: this.data.scrollLine,
      currentTime: this.data.scrollLine
    });
    app.globalData.audioPlayer.seek(this.data.scrollLine);
  }
})