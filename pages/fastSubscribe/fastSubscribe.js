// pages/fastSubscribe/fastSubscribe.js
const app = getApp();
var common = require('../mine_module/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      globalUrl: app.globalData.globalUrl,
      globalUrl2: app.globalData.globalUrl2,
      selectPerson: true,
      selectPerson2: true,
      firstPerson: '北京市',
      firstPerson2: '助老护理（普通）',
      selectArea: false,
      areaList:[],
      careServiceList:[],
      date:'点击选择日期',
      phone:'',
      location:'',
      price:'100.00',
      remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.InfoList();
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
  phone: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  location: function(e){
    this.setData({
      location: e.detail.value
    })
  },
  remark: function(e){
    this.setData({
      remark: e.detail.value
    })
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  clickPerson02: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea2: true,
        selectPerson2: false,
      })
    } else {
      this.setData({
        selectArea2: false,
        selectPerson2: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    let that = this;
    console.info(e)
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    });
  },
  mySelect02: function (e) {
    let that = this;
    console.info(e)
    this.setData({
      firstPerson2: e.target.dataset.me,
      selectPerson2: true,
      selectArea2: false,
    });
  },
  InfoList: function () {
    let that = this;
    let data = {};
    data.param = {};
    data.type = "POST";
    data.url = app.globalData.globalUrl + '/f/interface/his/careWorker/getQuickApplyFormBaseData';
    common.postData(data, function (result) {
      console.log(result);
      that.setData({
        areaList: result.data.data.areaList,
        careServiceList : result.data.data.careServiceList
        
        // companyList: result.data.data.list
      });
      console.log(that.data)
      // wx.stopPullDownRefresh();
    });
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  submit: function(){
    let that = this;
    if (that.data.date == '点击选择日期'){
      wx.showToast({
        title: '请选择日期',
        duration: 1000,
        icon: 'none'
      });
      return;
    }else if(that.data.phone == ''){
      wx.showToast({
        title: '请填写您的联系方式',
        duration: 1000,
        icon: 'none'
      });
      return;
    } else if (that.data.location == '') {
      wx.showToast({
        title: '家庭住址不能为空哦',
        duration: 1000,
        icon: 'none'
      });
      return;
    } else if (that.data.remark == '') {
      wx.showToast({
        title: '请填写您的其它要求',
        duration: 1000,
        icon: 'none'
      });
      return;
    }
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    let data = {};
    data.param = {
      'user.id': userInfo.id,
      'careserviceCatId': that.data.firstPerson2,
      'province': that.data.firstPerson,
      'fromTime': that.data.date,
      'mobile': that.data.value,
      'address': that.data.location,
      'otherDesc': that.data.remark
    };
    data.type = "POST";
    data.url = app.globalData.globalUrl + '/f/interface/his/care/applyForQuickCareAppo';
    common.postData(data, function (result) {
      console.log(result);
      if(result.data.ret == 0){
        wx.showToast({
          title: '请支付',
          duration: 2000,
        })
      }
    });
  }
})