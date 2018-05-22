// pages/login-account/login-account.js
const app = getApp()    // 加这句就可以使用app.js里的内容
var common = require('../mine_module/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    securityCode: '获取验证码',
    buttonDisabled: false,
    phoneNumber: '',
    verifyID: '',
    globalUrl: app.globalData.globalUrl2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '账号登录'
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#d2cac4',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });

    // app.postData({param:{a:1}});
    // common.sayGoodbye('MINA')
    // common.postData({param:{a:1}});
    // sessionStorage.sid = 'rainzhou'
    console.log(sessionStorage)
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

  },
  phoneNumber: function (e) {
    // console.log(e)
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  // 表单提交
  formSubmit: function (e) {
    wx.showLoading({
      title: '登录中',
    })
    let that = this;
    let formData = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', formData);

    if (formData.input4 !== "") {
      // console.log('密码合格');
      wx.request({
        url: app.globalData.globalUrl +'/f/interface/his/user/loginForPatient', //仅为示例，并非真实的接口地址
        data: {
          loginFrom: "user_login",
          loginName: formData.input1,
          password: formData.input4
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          wx.showToast({
            title: res.data.retMsg,
            icon: 'none',
            duration: 2000
          });
          if (res.data.ret == '0') {
            // 调到登录页
            console.log('登录成功');
            wx.setStorageSync('sid', res.data.sid);
            wx.setStorageSync('userInfo', res.data.data.user);
            wx.setStorageSync('accessToken', res.data.access_token);
            let data = {};
            data.param = {};
            data.type = "POST";
            data.url = app.globalData.globalUrl+'/f/interface/his/sys/getHospitalList';
            common.postData(data, function (result) {
              console.log(result);
              if(result.data.retMsg == '获取成功'){
                wx.setStorageSync('hospitalId', result.data.data.list[0].id);
                // app.globalData.hospitalId = result.data.data.list[0].id;
                // console.log('登录页'+app.globalData.hospitalId)
              }
            });
            try {
              let sid = wx.getStorageSync('sid');
              let accessToken = wx.getStorageSync('accessToken');
              let hospitalId = wx.getStorageSync('hospitalId');
              
              if (sid || accessToken) {
                console.log('sid='+sid+',accessToken='+accessToken+',hospitalId='+hospitalId);
                // Do something with return value
              }
            } catch (e) {
                console.log(e)
            }
            wx.switchTab({
              url: '../index/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                console.log(page)
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            }) 
          }
        }
      })
    } else {
      // console.log('密码不一致');
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 调取手机验证码
  securityCode: function () {
    var that = this;
    wx.request({

      url: 'http://rain.tunnel.qydev.com/f/interface/his/user/getCode', //仅为示例，并非真实的接口地址
      data: {
        mobile: that.data.phoneNumber
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        that.setData({
          verifyID: res.data.data.verifyID
        })
        console.log(that.data.verifyID)
      }
    })

    this.setData({
      buttonDisabled: true
    });
    var data = 60;
    var runInterval = setInterval(function () {
      if (data > 0) {
        data = data - 1;
        that.setData({
          securityCode: data + '秒'
        });
      } else {
        that.setData({
          securityCode: '获取验证码',
          buttonDisabled: false
        });
        clearInterval(runInterval);
      }

    }, 1000)
  },
  goPasswordLogin: function () {
    wx.redirectTo({
      url: '../login-account/login-account'
    })
  },
  goLogin: function(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  goRegister: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  }
})