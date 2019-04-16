/**
 * code2session
 */
var getSession = function(appid, appsecret, jscode, that) {
  wx.request({
    url: 'https://127.0.0.1/getSession',
    data: {
      "jscode": jscode,
      "appid": appid,
      "appsecret": appsecret
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      console.log(JSON.stringify(res));
      that.globalData.security.session = res.data.session_key;
      that.globalData.security.openid = res.data.openid;
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

var Crypto = require('./cryptojs/cryptojs.js').Crypto;
/**
 * 解析运动数据
 */
var decryptData = function(data, session, iv, that) {
  var dataBytes = Crypto.util.base64ToBytes(data);
  var sessionBytes = Crypto.util.base64ToBytes(session);
  var ivBytes = Crypto.util.base64ToBytes(iv);


  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  var decryptData = Crypto.AES.decrypt(data, sessionBytes, {
    mode: mode,
    iv: ivBytes,
    asBytes: true //false: bytesToBase64
  });
  console.log("decrypt: " + Crypto.charenc.UTF8.bytesToString(decryptData));

  //运动数据分析
  var str = JSON.parse(Crypto.charenc.UTF8.bytesToString(decryptData));
  var stepInfos = str.stepInfoList;
  var steps = [];
  for (var i = 0; i < stepInfos.length; i++) {
    var time = stepInfos[i].timestamp;
    var d = new Date(time * 1000);
    var mon = d.getMonth() + 1;
    var dateStr = "" + d.getFullYear() + "/" + mon + "/" + d.getDate();
    var ele = JSON.parse("{\"date\":\"" + dateStr + "\",\"step\":" + stepInfos[i].step + "}");
    steps.push(ele);
  }

  that.setData({
    stepInfoList: steps,
    data: true
  }, () => {
    console.log("ok...");
    console.log(JSON.stringify(that.data.stepInfoList));
  });

  // saveInCache();//....
}

/**
 * 校验签名
 */
var checkSignature = function(session, rawData, signature) {
  var data = rawData + session;
  var res = Crypto.SHA1(data, {
    asBytes: false
  });
  console.log("sha1= " + res);
  console.log("sha1=" + signature);
  if (res == signature)
    console.log("signature: just be ok!");
  else {
    wx.navigateBack({
      delta: -1,
    });
  }
}
module.exports.getSession = getSession
module.exports.decryptData = decryptData
module.exports.checkSignature = checkSignature