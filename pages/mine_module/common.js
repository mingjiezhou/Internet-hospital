// 这个文件 定义公共的 ajax 函数，封装了加密方法
var base64 = require('base64.js');
var md5 = require('md5.js');


// 封装的后台请求函数，每次请求先验证权限，通过后才会真正发起 ajax，否则提示用户登录
function postData(data, callback, load) {

  console.log("页面传过来的data", data);

  // 调用验权函数
  encryption(data.param,function(result){
    console.log(result)
    if(result){
      console.log(data.param);
      wx.showLoading({
        title: '加载中'
      })
      wx.request({
        url: data.url,
        // data: data.param, //要用双引号!!
        data: json2Form(data.param), //要用双引号!!
        dataType: "json",
        method: data.type,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (data, textStatus) {
          setTimeout(function () {
            wx.hideLoading();
          }, 500)
          console.log(data);
          if (typeof (data) != "object" && data != "") {
            data = JSON.parse(data);
          }
          switch (data.data.ret) {
            case "0":
              setTimeout(function () {
                wx.hideLoading();
              }, 500)
              callback(data);
              break;
            case "60044":
              // wx.showToast({
              //   title: '登录信息已过期，请重新登录',
              //   icon: 'none',
              //   duration: 1000
              // });
              wx.showModal({
                content: '您的登录信息已过期，是否重新登录',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '../login-account/login-account'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              break;
            case "60026":
              // wx.showToast({
              //   title: '登录信息已过期，请重新登录',
              //   icon: 'none',
              //   duration: 1000
              // });
              wx.showModal({
                content: '签名验证不通过，是否重新登录',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '../login-account/login-account'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              break;
            default:
              
              callback(data);
          }
          // if (load) $('.loader').remove();
        },
        fail: function (data, textStatus, errorThrown) {
          console.log(data);
          if (typeof (data) != "object" && data != "") {
            data = JSON.parse(data);
          }
          callback(data);
        }
      })
    }
  });
}

var globalAppUrl = "";

// 转换了data.param的数据传输格式（其实不必要）
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}  

// 加密验权函数
function encryption(params,callback) {
  // var sid = 'd4dc3aae6c86438eb3fde8ae506e521e';
  // var access_token = '289875947c3bd1d35eb2af26a2543d2e';
  // params.sid = sessionStorage.sid;
  let sid = wx.getStorageSync('sid');
  if (sid) {
    console.log('sid=' + sid);
    params.sid = sid;
  }
  // console.log(sessionStorage)
  params.time_stamp = new Date().getTime() + '';
  //    alert("sid==="+sid + " access_token=="+accessToken);
  var arr = new Array();
  for (var key in params) {
    arr.push(key);
  }
  arr.sort();

  var jsonObj = {};

  for (var index = 0; index < arr.length; index++) {

    var key = arr[index];
    jsonObj[key] = params[key];
  }

  // console.log(jsonObj)
  wx.getStorage({
    key:'accessToken',
    success:function(res){
      console.log(res)
      console.log('accessToken=' + res.data);
      var str = JSON.stringify(jsonObj) + res.data;
      console.info(str)
      // var sign = Base.encode(MD5(str));
      // var sign = base64.Base.encode(MD5(str));
      var sign0 = base64;
      console.log(base64);
      console.log(base64.encode('rain'));
      var sign1 = md5.MD5(str);
      var sign = sign0.encode(sign1);
      console.info(sign);
      params.sign = sign;
      // result = true;
      callback(true)
    },
    fail:function(res){
      console.log(res)
      wx.showToast({
        title: '请您先登录账户',
        icon: 'none',
        duration: 2000
      });
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      // result = false;
      callback(false);
    }
  });
}

module.exports.postData = postData;   //这里需要直接暴露接口，若不暴露就是不能引用到
