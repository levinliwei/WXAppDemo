// pages/home/home.js

var fileData = require('../../utils/util.js')
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:
      [{ title: "芝华士", content: "内容1", time: "12:21", task: "0", checked: false },
      { title: "黑方", content: "内容2", time: "12:22", task: "1", checked: false },
      { title: "格威特", content: "内容3", time: "12:23", task: "2", checked: false },
      { title: "麦芽威士忌", content: "内容4", time: "12:24", task: "3", checked: false },
      { title: "特价曼哈顿", content: "内容5", time: "12:25", task: "4", checked: false },
      { title: "长城干红", content: "内容6", time: "12:26", task: "5", checked: false },
      { title: "奔富707", content: "内容7", time: "12:27", task: "6", checked: false },
      { title: "红玫瑰", content: "内容8", time: "12:28", task: "7", checked: false },
      { title: "鸡尾酒", content: "内容9", time: "12:29", task: "8", checked: false }],

    bigSelectId: -1,
    smallSelectId: -1,
    userSelectBigValue: "",
    userSelectSmallValue: "",
    currentAddress: '当前地址',
    latitude: null,
    longitude: null,
    address: null,
    avatarImg:"http://img5.imgtn.bdimg.com/it/u=4214211458,453823117&fm=26&gp=0.jpg",

  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res.latitude)
        console.log(res.longitude)
        var latitude = res.latitude
        var longitude = res.longitude

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        var qqmapsdk = new QQMapWX({
          key: 'TJQBZ-VK73O-TERWK-S3ZIR-5W4H6-46BSJ' // 必填
        });
        //2、根据坐标获取当前位置名称，
        qqmapsdk.reverseGeocoder({
          location: {
            // latitude: latitude,
            // longitude: longitude
            latitude: 39.984060,
            longitude: 116.307520
          },
          success: function (addressRes) {
            console.log(addressRes.result.address)
            that.setData({
              address: addressRes.result.address
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorageSync('bigSelect', "")
    wx.setStorageSync('smallSelect', "")
  },

  come_baby: function (event) {
    wx.switchTab({
      url: '../reserve/reserve',
    })
  },

  bigSelectedView: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      bigSelectId: e.currentTarget.id,
      userSelectBigValue: that.data.items[e.currentTarget.id].title,
    })
    wx.setStorageSync('bigSelect', that.data.items[e.currentTarget.id].title)
  },

  smallSelectedView: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      smallSelectId: e.currentTarget.id,
      userSelectSmallValue: that.data.items[e.currentTarget.id].time,
    })
    wx.setStorageSync('smallSelect', that.data.items[e.currentTarget.id].time)
  },

  // 右上角触发转发分享功能
  onShareAppMessage: function () {
    return {
      title: '测试转发',
    }
  },

  // danmu
  danmu: function () {
    wx.navigateTo({
      url: '../doomu/doomu',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  confirmBtn: function (e) {
    var data = this;
    var bigSelect = wx.getStorageSync('bigSelect');
    var smallSelect = wx.getStorageSync('smallSelect');

    wx.navigateTo({
      // url: '../detail/detail?table='+bigSelect+'&time='+smallSelect+'',
      url: '../reserve/reserve',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

})