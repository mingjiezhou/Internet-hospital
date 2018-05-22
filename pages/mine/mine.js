// pages/demo6/demo6.js
var common = require('../mine_module/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'请点击登录',
    userPhoto: '../img/mineico0.png',
    url:'',
    openType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    console.log('开始加载！！！')
    var that = this
    try {
      wx.getStorage({
        key: 'sid',
        success: function (res) {
          that.setData({
            url: '../accountManage/accountManage',
            openType: 'navigate'
          })
        },
        fail: function () {
          that.setData({
            url: '../login-account/login-account',
            openType: 'redirect'
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
    let data = {};
    data.param = {};
    data.type = "POST";
    data.url = app.globalData.globalUrl +'/f/interface/his/user/getCurrentUser';
    common.postData(data, function (result) {
      switch (result.data.ret) {
        case "0":
          let userData = result.data.data.user;
          console.log(userData)
          that.setData({
            name: userData.name,
            userPhoto: 'http://rain.tunnel.qydev.com' + userData.photo
          });
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          break;
        case "60044":
          wx.showToast({
            title: '此用户已在别处登录，请重新登录',
            icon: 'none',
            duration: 1000
          });
          that.setData({
            url: '../login-account/login-account',
            name: '请点击登录',
            userPhoto: '../img/mineico0.png',
            userPhoto: '../img/mineico0.png',
            openType: 'redirect'
          });
          wx.removeStorageSync('sid');
          wx.removeStorageSync('accessToken');
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
      }
      console.log(result);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('mine'+'Show');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    console.log('开始加载！！！')
    var that = this
    try {
      wx.getStorage({
        key: 'sid',
        success: function (res) {
          that.setData({
            url: '../accountManage/accountManage',
            openType: 'navigate'
          })
        },
        fail: function () {
          that.setData({
            url: '../login-account/login-account',
            openType: 'redirect'
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
    let data = {};
    data.param = {};
    data.type = "POST";
    data.url = 'http://rain.tunnel.qydev.com/f/interface/his/user/getCurrentUser';
    common.postData(data, function (result) {
      switch (result.data.ret) {
        case "0":
          let userData = result.data.data.user;
          console.log(userData)
          that.setData({
            name: userData.name,
            userPhoto: 'http://rain.tunnel.qydev.com' + userData.photo
          });
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          break;
        case "60044":
          wx.showToast({
            title: '此用户已在别处登录，请重新登录',
            icon: 'none',
            duration: 1000
          });
          that.setData({
            url: '../login-account/login-account',
            name:'请点击登录',
            userPhoto: '../img/mineico0.png',
            openType: 'redirect'
          });
          wx.removeStorageSync('sid');
          wx.removeStorageSync('accessToken');
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
      }
      console.log(result);
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})