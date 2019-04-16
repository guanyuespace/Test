// pages/me/me.js
const decrypt = require("../../utils/decrypt.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: false,
    stepInfoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  /////////////////////////////
  getMWeRunData: function() {
    app.checkgetSession();
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.werun']) {
          wx.getWeRunData({
            success: res => {
              console.log("run= " + JSON.stringify(res));
              const encryptedData = res.encryptedData;
              decrypt.decryptData(encryptedData, app.globalData.security.session, res.iv, this);
            },
            fail: res => {
              console.log("WeRunData: err=" + JSON.stringify(res));
            }
          });
        } else {
          wx.authorize({
            scope: 'scope.werun',
            success: () => {
              wx.getWeRunData({
                success: res => {
                  console.log("run= " + JSON.stringify(res));
                  const encryptedData = res.encryptedData;
                  decrypt.decryptData(encryptedData, app.globalData.security.session, res.iv, this);
                },
                fail: res => {
                  console.log("WeRunData: err=" + JSON.stringify(res));
                }
              });
            }
          })
        }
      }
    });
  }
})