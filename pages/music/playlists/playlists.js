 // pages/music/music_playlists/music_playlists.js
 const app = getApp();
 const core = require("../../../utils/core.js");
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     userId: 0,
     nickname: "",
     avatarUrl: "",
     playlists: [],
     switchFlag: false,
     more: false,
     offset: 0
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     console.log(JSON.stringify("playlists options=" + JSON.stringify(options)));
     ///init 
     this.setData({
       userId: app.globalData.music_user.id,
       nickname: app.globalData.music_user.nickname
     }, () => {
       console.log("current userid=" + this.data.userId + "\t nickname=" + this.data.nickname);
     });

     ///用户头像设置
     try {
       var uid = wx.getStorageSync("avatarUrl_id");
       console.log("avatar uid= " + uid);
       if (uid == this.data.userId) {
         var avatar = wx.getStorageSync("avatarUrl");
         if (avatar) {
           console.log("ava:" + avatar);
           this.setData({
             avatarUrl: avatar
           });
         } else {
           core.getUserInfo(this.data.userId, this);
         }
       } else {
         core.getUserInfo(this.data.userId, this);
       }
     } catch (e) {
       console.log(JSON.stringify(e));
     }

     ////用户歌单信息获取
     try {
       var uid = wx.getStorageSync("playLists_uid");
       console.log("playlist uid=" + uid);
       if (uid == this.data.userId) {
         var self = this;
         wx.getStorage({
           key: 'playlists',
           success: function(res) {
             self.setData({
               playlists: res.data
             }, () => {
               console.log("get playlist from cache");
             });
           },
         });
       } else {
         this.clearPlayListsCache();
         core.getPlayList(this.data.userId, 0, this, true);
       }
     } catch (e) {
       console.log(JSON.stringify(e));
     }
     /////设置audioPlayer
     // app.globalData.audioPlayer = wx.createInnerAudioContext();

     // 全局唯一后台播放
     app.globalData.audioPlayer = wx.getBackgroundAudioManager();
     console.log("create player....");
     app.globalData.audioPlayer.onPlay(() => {
       console.log("play ..... lyricPage=" + app.globalData.lyricPage);
       if (app.globalData.lyricPage && app.globalData.lyricPage != 0) { //进入歌词页
         /**
          * notify ..
          * 设置时长... ...
          */
         app.globalData.lyricPage.setDurations();
       } else { //

       }
     });
     app.globalData.audioPlayer.onEnded(() => {
       //取消自动播放or设置标志位--->点击进入下一曲
       if (app.globalData.playLists && app.globalData.playLists.length > 0) {
         app.globalData.curMusic = ++app.globalData.curMusic % app.globalData.playLists.length;
         var cur = app.globalData.playLists[app.globalData.curMusic]; //playLists.shift()
         //获取歌曲URL
         core.getCachedMusic(cur.id, cur.name, app);
         if (app.globalData.lyricPage && app.globalData.lyricPage != 0) {
           app.globalData.lyricPage.refresh(cur);
         }
       } else {
         console.log("播放列表已空!");
       }
     });
     app.globalData.audioPlayer.onTimeUpdate(() => {
       // console.log("time !!!!!");
       // 播放进度
       // 作用？？
     });


     /**
      * 系统后台播放
      * 只需获取CachedMusicUrl
      */
     app.globalData.audioPlayer.onNext(() => {
       //  console.log("next !!!!!");
       // 系统后台播放管理  
       if (app.globalData.playLists && app.globalData.playLists.length > 0) {
         app.globalData.curMusic = ++app.globalData.curMusic % app.globalData.playLists.length;
         var cur = app.globalData.playLists[app.globalData.curMusic]; //playLists.shift()
         //获取歌曲URL
         core.getCachedMusic(cur.id, cur.name, app);
         app.globalData.curMusic++;
       } else {
         console.log("播放列表已空!");
       }
     });
     app.globalData.audioPlayer.onPrev(() => {
       // 系统后台播放管理
       if (app.globalData.playLists && app.globalData.playLists.length > 0) {
         app.globalData.curMusic = --app.globalData.curMusic % app.globalData.playLists.length;
         if (app.globalData.curMusic < 0) app.globalData.curMusic += app.globalData.playLists.length;
         console.log("prev: " + app.globalData.curMusic);
         var cur = app.globalData.playLists[app.globalData.curMusic]; //app.globalData.playLists.splice(0, 1); //playLists.shift()
         //获取歌曲URL
         core.getCachedMusic(cur.id, cur.name, app);
       } else {
         console.log("播放列表已空!");
       }
     });

     app.globalData.audioPlayer.onError((res) => {
       console.log(res.errMsg);
       wx.showModal({
         title: 'Error',
         content: '由于版权限制，未登录非VIP无法播放该歌曲！',
         showCancel: false,
         // cancelText: '',
         // cancelColor: '',
         confirmText: '确定',
         confirmColor: '0000ff',
         success: function(res) {
           //....
           //登录UI触发

         },
         fail: function(res) {
           //keep this state ...
         },
         complete: function(res) {},
       })
     });
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
     if (this.data.switchFlag) {
       ///用户头像设置
       if (this.data.userId != app.globalData.music_user.id) {
         this.setData({
           userId: app.globalData.music_user.id,
           nickname: app.globalData.music_user.nickname
         }, () => {
           console.log("update user=" + JSON.stringify(app.globalData.music_user));
         })
       }
       try {
         var uid = wx.getStorageSync("avatarUrl_id");
         console.log("avatar uid= " + uid);
         if (uid == this.data.userId) {
           var avatar = wx.getStorageSync("avatarUrl");
           if (avatar) {
             console.log("ava:" + avatar);
             this.setData({
               avatarUrl: avatar
             });
           } else {
             core.getUserInfo(this.data.userId, this);
           }
         } else {
           core.getUserInfo(this.data.userId, this);
         }
       } catch (e) {
         console.log(JSON.stringify(e));
       }

       ////用户歌单信息获取
       try {
         var uid = wx.getStorageSync("playLists_uid");
         console.log("cached playlist uid=" + uid + "\t now=" + this.data.userId);
         if (uid == this.data.userId) {
           var self = this;
           wx.getStorage({
             key: 'playlists',
             success: function(res) {
               self.setData({
                 playlists: res.data
               }, () => {
                 console.log("get playlist from cache");
               });
             },
           });
         } else {
           //清理上次用户残留
           this.clearPlayListsCache();
           //added ....
           core.getPlayList(this.data.userId, 0, this, true);
         }
       } catch (e) {
         console.log(JSON.stringify(e));
       }
       this.data.switchFlag = false;
     }
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



   clearPlayListsCache: function() {
     this.setData({
       playlists: []
     })
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
     if (this.data.more) {
       console.log("loading ...");
       this.data.offset += 20;
       core.getPlayList(this.data.userId, this.data.offset, this);
     } else {
       console.log("no more playlist ......");
     }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   },
   getdetailPlayList: function(event) {
     // console.log("get detail playlist event=" + JSON.stringify(event));
     var id = event.target.dataset.id;
     var name = event.target.dataset.name;
     wx.navigateTo({
       url: '/pages/music/musics/musics?id=' + id + "&name=" + name,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
   },
   switchUserButton: function(event) {
     app.globalData.audioPlayer.stop();
     this.data.switchFlag = true;
     wx.navigateTo({
       url: '/pages/music/user/user',
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
   }
 })