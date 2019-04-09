// pages/music/music_musics/music_musics.js
const app = getApp();
const core = require("../../../utils/core.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlistid: 0,
    playlistname: "",
    musics: [],
    creator: {},
    count: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("musics onLoad options=" + JSON.stringify(options));
    //init
    this.setData({
      playlistid: options.id,
      playlistname: options.name
    }, () => {

    });

    //翻页功能...
    //....
    //获取歌曲信息
    try {
      var id = wx.getStorageSync("playlistid" + this.data.playlistid); //加载过多歌单信息... 
      //TODO:
      //list 保存最近10个歌单 ---> playlistid
      //removeStorage
      console.log("playlistid=" + this.data.playlistid);
      var self = this;
      if (id && id == this.data.playlistid) {
        wx.getStorage({
          key: "musics" + this.data.playlistid,
          success: function(res) {
            self.setData({
              musics: res.data
            }, () => {
              console.log("get musics from cache");
            });
          },
          fail: function(res) {
            console.log("why?" + JSON.stringify(res));
          },
          complete: function(res) {},
        });
        wx.getStorage({
          key: "creator" + this.data.playlistid,
          success: function(res) {
            self.setData({
              creator: res.data
            }, () => {
              console.log("get creator from cache");
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        });
      } else {
        core.getMusic(this.data.playlistid, this);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
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
  backHome: function(event) {
    // console.log("musics backHome-click event=" + JSON.stringify(event));
    wx.switchTab({
      url: '/pages/music/playlists/playlists',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  switch2lyric: function(event) {
    var id = event.target.dataset.id;
    var name = event.target.dataset.refer;
    wx.navigateTo({
      url: '/pages/music/lyric/lyric?id=' + id + "&name=" + name,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})