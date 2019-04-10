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
    durations: '00:00',
    length: 0,
    playFlag: true,
    timer: 0
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
   * 播放音频后回调
   * 等音频播放之后（也不可立即获取），才能获取当前时长，总时长
   * 设置播放时长
   */
  setDurations: function() {
    var all;
    var temp = setInterval(() => {
      all = app.globalData.audioPlayer.duration;
      console.log("why zero ???" + all);
      var mintues = Math.floor(all / 60);
      var seconds = Math.floor(all - mintues * 60);
      this.setData({
        durations: mintues > 9 ? mintues + ":" + seconds : "0" + mintues + ":" + (seconds > 9 ? seconds : "0" + seconds)
      }, () => {
        console.log("------------------> " + this.data.durations + "\t" + all);
        if (all && all != 0)
          clearInterval(temp);
      });
    }, 50);

    var query = wx.createSelectorQuery();
    var that = this;
    query.select(".line").boundingClientRect((rect) => {
      that.data.length = rect.width;
    }).exec();

    //更新进度条
    if (this.data.timer != 0)
      clearInterval(this.data.timer);
    this.data.timer = setInterval(() => {
      // console.log("player: " + JSON.stringify(app.globalData.audioPlayer) + "\t" + app.globalData.audioPlayer.currentTime + " ; " + app.globalData.audioPlayer.duration);
      var curTime = app.globalData.audioPlayer.currentTime;
      var mintues = Math.floor(curTime / 60);
      var seconds = Math.floor(curTime - mintues * 60);
      this.setData({
        currentTime: mintues > 9 ? mintues + ":" + seconds : "0" + mintues + ":" + (seconds > 9 ? seconds : "0" + seconds),
        scrollLine: curTime * this.data.length / app.globalData.audioPlayer.duration,
      }, () => {
        console.log(this.data.currentTime + "\t" + this.data.scrollLine);
      });
    }, 500);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.globalData.lyricPage = this;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(timer);
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
    var curTime = app.globalData.audioPlayer.currentTime;
    var all = app.globalData.audioPlayer.duration;
    console.log(curTime + "  " + all);
    if (curTime < all) {
      if (curTime + 10 < all) {
        curTime += 10;
        app.globalData.audioPlayer.seek(curTime);
      } else {
        curTime = all;
        app.globalData.audioPlayer.seek(curTime);
      }
    }
  },
  kuaitui: function() {
    var curTime = app.globalData.audioPlayer.currentTime;
    console.log("???" + curTime);
    if (curTime > 0) {
      if (curTime - 10 > 0) {
        curTime -= 10;
        app.globalData.audioPlayer.seek(curTime);
      } else {
        curTime = 0;
        app.globalData.audioPlayer.seek(curTime);
      }
    }
  }
})