/**
 * github login etc.
 * 
 * problem:
 * github.com 未经过ICP域名备案，
 * 不可添加到微信小程序requests请求的合法域名之下
 * 解决方案：自建服务器处理，不校验
 *  
 * only--> 不校验... ... 无意义
 */

/**
 * api简介
 * 
 * 登陆：
 *   - 登陆页面
 *      url: https://github.com/login
 *      获取参数：utf8,authenticity_token(input[hidden])
 * 
 *   - 登陆
 *      url: https://github.com/session
 *      
 *      content-type: application/x-www-form-urlencoded
 *      post-data:
 *             {
 *              utf8
 *              authenticity_token
 *              login//账号
 *              password//密码明文
 *             }
 * 
 *  登陆完成后--->数据get请求... ...
 * 
 * cookie设置：
 *     wx.setStorageSync("sessionid", res.header["Set-Cookie"])
 *     header = {
 *        'cookie':wx.getStorageSync("sessionid")//读取cookie
 *     };
 */


var getParams = function() {
  wx.request({
    url: 'https://github.com/login',
    method: 'GET',
    success: function(res) {
      //<input name="utf8" type="hidden" value="✓">
      //<input type="hidden" name="authenticity_token" value="ucE6mfBimLQ2tEuTNcfDwNOHkWZlLDtiIxIwzPFGR1Is/hRmp2rQDs2Ms6TXdwinBoUPphwQEhvH8zmSjjGAMg==">
      console.log(JSON.stringify(res));


      

    },
    fail: function(res) {},
    complete: function(res) {},
  })
}


var loginGitHub = function() {
  getParams();

  // wx.request({
  //   url: 'https://github.com/session',
  //   data: {
  //     "utf8": "%E2%9C%93",
  //     "authenticity_token": "",
  //     "login": "",
  //     "password": ""
  //   },
  //   header: {},
  //   method: 'POST',
  //   dataType: 'json',
  //   responseType: 'text',
  //   success: function(res) {},
  //   fail: function(res) {},
  //   complete: function(res) {},
  // })
}



module.exports.loginGitHub = loginGitHub