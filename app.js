//app.js
const core = require("./utils/core.js");
const decrypt = require("./utils/decrypt.js");
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        decrypt.getSession(this.globalData.security.appid, this.globalData.security.appsecret, res.code, this);
      }
    });
    //test
    // core.getPics();
  },
  checkgetSession: function() {
    var that = this;
    wx.checkSession({
      success: function(res) {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("?????????????????????????????");
        console.log(JSON.stringify(res));
      },
      fail: function(res) {
        // session_key 已经失效，需要重新执行登录流程
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            decrypt.getSession(that.globalData.security.appid, that.globalData.security.appsecret, res.code, that);
          }
        });
      },
      complete: function(res) {},
    })

  },
  globalData: {
    music_user: {
      avatar:"http://p1.music.126.net/7ubV68Nbejws3cFCpGWNxw==/1385384660588488.jpg",
      id: 275438773,
      nickname: "关月天人"
    },
    security: {
      appid: "wxea74db422c9ef21d",
      session: "",
      openid: "",
      appsecret: "83e0d4cc526a7b08ca492fc6977c5d62"
    },
    audioPlayer: {},
    playLists: [],
    curMusic: 0,
    /**按歌单进行播放 */
    lyricPage: 0,
    test: true
  }
})
