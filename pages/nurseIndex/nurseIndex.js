// pages/nurseIndex/nurseIndex.js
const app = getApp();
var common = require('../mine_module/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalUrl: app.globalData.globalUrl,
    globalUrl2: app.globalData.globalUrl2,
    banner:'',
    publicityIco:[],
    serviceType:[],
    serviceFast:{},
    serviceRange: [],
    companyList: [],
    selectPerson: true,
    firstPerson: '1公里以内',
    selectArea: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that= this;
    let data= {};
    data.param= {};
    data.type= "POST";
    data.url= app.globalData.globalUrl + '/f/interface/his/sys/getCareHomePageData';
    common.postData(data, function (result) {
      let needData = result.data.data;
      that.setData({
        banner: needData.banna[0].image,
        publicityIco: needData.tip,
        serviceType: needData.careServiceCatList,
        serviceFast: needData.navBar[0],
        serviceRange: needData.hmCompanyDisList
      })
    });

    // 获取经纬度,默认1km范围
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        // let latitude = res.latitude
        let latitude = 31.201
        // let longitude = res.longitude
        let longitude = 121.5982

        // var speed = res.speed
        // var accuracy = res.accuracy
        that.findCompanyList(1, latitude, longitude);
        that.setData({
          firstPerson: '1公里以内'
        })
      }
    });

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
  //点击切换
  mySelect: function (e) {
    let that = this;
    console.info(e)
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    });
    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        // let latitude = res.latitude
        let latitude = 31.201
        // let longitude = res.longitude
        let longitude = 121.5982
        
        // var speed = res.speed
        // var accuracy = res.accuracy
        that.findCompanyList(e.target.dataset.km, latitude, longitude);
      }
    })
  },

  findCompanyList: function(x,y,z) {
    let that = this;
    let data = {};
    data.param = {
      maxDistance : x,
      latitude : y,
      longitude : z
    };
    data.type = "POST";
    data.url = app.globalData.globalUrl + '/f/interface/his/sys/getNearHmCompanyList';
    common.postData(data, function (result) {
      console.log(result);
      console.log(result.data.data);
      console.log(result.data.data.list);
      that.setData({
        companyList: result.data.data.list
      });
      wx.stopPullDownRefresh();      
    });
  },
  onPullDownRefresh: function () {
    this.onLoad();
  },
  goFindNurse: function(){
    
  }
})