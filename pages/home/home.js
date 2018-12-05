// pages/home/home.js

var fileData = require('../../utils/util.js')
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
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorageSync('bigSelect', "")
    wx.setStorageSync('smallSelect', "")
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

  confirmBtn: function (e) {
    var data = this;
    var bigSelect = wx.getStorageSync('bigSelect');
    var smallSelect= wx.getStorageSync('smallSelect');

    wx.navigateTo({
      url: '../detail/detail?table='+bigSelect+'&time='+smallSelect+'',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})