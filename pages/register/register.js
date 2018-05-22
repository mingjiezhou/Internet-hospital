// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   securityCode:'获取验证码',
   buttonDisabled:false,
   phoneNumber:'',
   verifyID:'',
   globalUrl: app.globalData.globalUrl2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册'
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#d2cac4',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  
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
    console.log(e)
    this.setData({
      phoneNumber:e.detail.value
    })
  },
  // 表单提交,注册流程成功
  formSubmit: function (e) {
    let that = this;
    let formData = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', formData);

    if(formData.input3 == formData.input4) {
      // console.log('密码合格');
      wx.request({
        url: 'http://rain.tunnel.qydev.com/f/interface/his/user/registerForPatient', //仅为示例，并非真实的接口地址
        data: {
          mobile: formData.input1,
          verifyServID: that.data.verifyID,
          sms_code: formData.input2,
          password: formData.input3
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          
          if (res.data.ret == '0'){
            // 调到登录页
            wx.redirectTo({
              url: '../login/login'
            });
            wx.showToast({
              title: '注册成功，请输入账号密码登录',
              icon: 'none',
              duration: 1000
            });
          }else {
            wx.showToast({
              title: 'res.data.retMsg',
              icon: 'none',
              duration: 1000
            });
          }
        }
      })
    }else{
      // console.log('密码不一致');
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1000
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
      buttonDisabled:true
    });
    var data = 60;
    var runInterval = setInterval(function(){
      if(data > 0){
        data = data - 1;
        that.setData({
          securityCode: data + '秒'
        });
      }else{
        that.setData({
          securityCode: '获取验证码',
          buttonDisabled: false
        });
        clearInterval(runInterval);
      }
      
    },1000)
  }


})