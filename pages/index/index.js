//index.js
//获取应用实例
const app = getApp();
var common = require('../mine_module/common.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sersUrl:app.globalData.globalUrl+'',
    globalUrl: app.globalData.globalUrl2
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let hospitalId = wx.getStorageSync('hospitalId');
    console.log('主页获取医院Id'+hospitalId);
    let data = {};
    data.param = {
      hospitalId: hospitalId
    };
    data.type = "POST";
    data.url = app.globalData.globalUrl +'/f/interface/his/sys/getUserHomePageData';
    common.postData(data, function (result) {
      switch (result.data.ret) {
        case "0":
          let userData = result.data.data.user;
          console.log(userData)
          // that.setData({
          //   name: userData.name,
          //   userPhoto: 'http://rain.tunnel.qydev.com' + userData.photo
          // });
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          break;
        case "60044":
          wx.showToast({
            title: '此用户已在别处登录，请重新登录',
            icon: 'none',
            duration: 1000
          });
          // that.setData({
          //   url: '../login-account/login-account',
          //   name: '请点击登录',
          //   userPhoto: '../img/mineico0.png',
          //   userPhoto: '../img/mineico0.png',
          //   openType: 'redirect'
          // });
          wx.removeStorageSync('sid');
          wx.removeStorageSync('accessToken');
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
      }
      console.log(result);
    });
  },
  onReady: function () {

  },
  onShow: function(){

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  call120: function(e){
    wx.showModal({
      content: '是否要拨打120？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: '120'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  gomap: function(e){
    wx.navigateTo({
      url: '../map/map'
    })
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新开始')
    wx.showNavigationBarLoading()
    wx.stopPullDownRefresh()
    setTimeout(function(){
      wx.hideNavigationBarLoading()
    },2000)
    
    console.log('下拉刷新结束')
    
  }
})
