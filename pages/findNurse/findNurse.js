// pages/map/map.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: [
      { name: 'USA', value: '按月' },
      { name: 'CHN', value: '按天', checked: 'true' },
      { name: 'USA', value: '按次' },
    ],
    controls: [{
      id: 1,
      iconPath: '../img/mapico1.png',
      position: {
        left: 10,
        top: 300,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    markers: [{
      iconPath: "../img/mapico2.png",
      title: '你的位置',
      id: 0,
      latitude: '',
      longitude: '',
      width: 50,
      height: 50
      },
      {
        iconPath: "../img/mapico2.png",
        title: '你的位置',
        id: 0,
        latitude: '',
        longitude: '',
        width: 50,
        height: 50
      }
      ],
    polyline: [],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    latitude:'',
    longitude:'',
    array: [ '标准300元/次', '重症500元/次'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res)  
    //   }
    // })
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        // var latitude = res.latitude
        // var longitude = res.longitude
        console.log(res)
        
        that.setData ({
          latitude: res.latitude,
          longitude: res.longitude,
          markers:[{
            iconPath: "../img/mapico2.png",
            title: '你的位置',
            latitude: res.latitude+0.01,
            longitude: res.longitude+0.01,
            width: 18,
            height: 30
          },{
            iconPath: "../img/mapico2.png",
            title: '你的位置',
            latitude: res.latitude,
            longitude: res.longitude,
            width: 18,
            height: 30
          }],
          polyline: [
            {points: [
              { latitude: res.latitude, longitude: res.longitude},
              { latitude: res.latitude+0.01, longitude: res.longitude+0.01}
              ],
              width:2,
              color:'#000000'
            }
            ],          
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  controltap: function(){
    var that = this;
    console.log(22);
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        // var latitude = res.latitude
        // var longitude = res.longitude
        console.log(that.data)

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})