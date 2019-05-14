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
    lyric_url: "",
    currentTime: '00:00',
    lastTime: '00:00',
    percentNow: 0,
    durations: '00:00',
    playFlag: true,
    timer: 0,
    temp: 0,
    bg: "",
    lyric_time: [],
    curIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(app.globalData.test)
    wx.switchTab({
      url: '/pages/music/playlists/playlists'
    });
    console.log("lyricPage onLoad options=" + JSON.stringify(options));
    //init
    this.setData({
      lyricid: options.id,
      lyricname: options.name,
      bg: decodeURIComponent(options.bg)
    }, () => {

    });

    //获取歌词信息
    core.getLyric(this.data.lyricid, this);

    //获取歌曲URL
    core.getCachedMusic(this.data.lyricid, this.data.lyricname, app);
  },
  //下一曲页面
  refresh: function(music) {
    this.setData({
      lyricid: music.id,
      lyricname: music.name,
      bg: music.al.picUrl
    }, () => {

    });
    //获取歌词信息
    core.getLyric(this.data.lyricid, this);

    //获取歌曲URL
    core.getCachedMusic(this.data.lyricid, this.data.lyricname, app);
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
    /**获取总时长 */
    console.log("lyricPage lyric setDurations start");
    var all;
    if (this.data.temp != 0)
      clearInterval(this.data.temp);
    this.data.temp = setInterval(() => {
      all = app.globalData.audioPlayer.duration;
      console.log("all= " + all + "\t temp_timer=" + this.data.temp);
      var mintues = Math.floor(all / 60);
      var seconds = Math.floor(all - mintues * 60);
      this.setData({
        durations: mintues > 9 ? mintues + ":" + (seconds > 9 ? seconds : "0" + seconds) : "0" + mintues + ":" + (seconds > 9 ? seconds : "0" + seconds)
      }, () => {
        console.log("------------------> " + this.data.durations + "\t" + all);
        if (all && all != 0)
          clearInterval(this.data.temp);
      });
    }, 50);

    // 滚动歌词选择器,遍历dom树,耗时卡死
    // var query = wx.createSelectorQuery();
    // var that = this;
    // query.selectAll(".highlight").fields({
    //     dataset: true
    //   }, (res) => {
    //     // console.log(JSON.stringify(res));
    //     that.setData({
    //       lastTime: res[res.length - 1].dataset.time
    //     });
    //   }).exec(),

    /**更新进度条 */
    if (this.data.timer != 0)
      clearInterval(this.data.timer);
    this.data.timer = setInterval(() => {
      var curTime = app.globalData.audioPlayer.currentTime;

      ///////added to scroll the lyric/////////
      var i = 0;
      for (; i < this.data.lyric_time.length; i++) {
        if (this.data.lyric_time[i].seconds >= curTime)
          break;
      }
      ///////added to scroll the lyric/////////

      if (curTime < all) {
        var mintues = Math.floor(curTime / 60);
        var seconds = Math.floor(curTime - mintues * 60);
        var percentdata = Math.floor(curTime * 100 / all);
        this.setData({
          currentTime: mintues > 9 ? mintues + ":" + seconds : "0" + mintues + ":" + (seconds > 9 ? seconds : "0" + seconds),
          percentNow: percentdata,
          lastTime: this.data.lyric_time[i - 1 < 0 ? 0 : i - 1] ? this.data.lyric_time[i - 1 < 0 ? 0 : i - 1].secs : "00:00", //sometimes尚未获取歌词
          curIndex: i - 1
        }, () => {
          console.log(this.data.currentTime + "\t" + this.data.percentNow + "lastTime=" + this.data.lastTime);
        });
      } else {
        clearInterval(this.data.timer);
        this.setData({
          playFlag: false,
          percentNow: 100
        });
      }
    }, 500);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("lyricPage onShow");
    app.globalData.lyricPage = this;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.temp != 0)
      clearInterval(this.data.temp);
    if (this.data.timer != 0)
      clearInterval(this.data.timer);
    app.globalData.lyricPage = null;
    console.log("onHide lyricPage=" + app.globalData.lyricPage);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.temp != 0)
      clearInterval(this.data.temp);
    if (this.data.timer != 0)
      clearInterval(this.data.timer);
    app.globalData.lyricPage = null;
    console.log("lyricPage onUnload lyricPage=" + app.globalData.lyricPage);
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
      console.log("palyer: " + JSON.stringify(app.globalData.audioPlayer));
      this.setData({
        playFlag: true
      })
    } else {
      if (this.data.timer != 0)
        clearInterval(this.data.timer);
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
        this.data.playFlag = false;
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
  },
  nextMusic: function() {
    if (app.globalData.playLists && app.globalData.playLists.length > 0) {
      app.globalData.curMusic = ++app.globalData.curMusic % app.globalData.playLists.length;
      var cur = app.globalData.playLists[app.globalData.curMusic]; //playLists.shift()
      this.refresh(cur);
    } else {
      console.log("播放列表已空!");
    }
  },
  prevMusic: function() {
    if (app.globalData.playLists && app.globalData.playLists.length > 0) {
      app.globalData.curMusic = --app.globalData.curMusic % app.globalData.playLists.length;
      if (app.globalData.curMusic < 0) app.globalData.curMusic += app.globalData.playLists.length;
      var cur = app.globalData.playLists[app.globalData.curMusic]; //app.globalData.playLists.splice(0, 1); //playLists.shift()
      this.refresh(cur);
    } else {
      console.log("播放列表已空!");
    }
  }
})
