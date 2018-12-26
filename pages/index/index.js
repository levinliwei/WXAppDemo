var QRCode = require('../../utils/weapp-qrcode.js')
var animationUtil = require('../../utils/AnimationUtil')
//index.js
//获取应用实例
const app = getApp()

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const qrcode_w = 300 / rate;
var qrcode;
var qrcode_content = '';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    qrcode_w: qrcode_w,
    qrcode_content:'',
    isShowHistoryArrow:true,
    isShowHistroryContent:false,
    items:[
      {content:'历史记录1',time:''},
      {content:'历史记录2',time:''},  {content:'历史记录3',time:''},  {content:'历史记录4',time:''}
    ],
  },
  openShowHistroy:function() {
     this.setData({
       isShowHistoryArrow:false,
       isShowHistroryContent:true
     })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoHomePage:function(){
    wx.navigateTo({
      url: '../home/home',
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
  },
  onLoad: function () {
    animationUtil.animationUpDownItem(this);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        qrcode_content: app.globalData.userInfo.nickName,
      })
      console.log('1' +this.data.qrcode_content)
      qrcode.makeCode(this.data.qrcode_content)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          qrcode_content:res.userInfo.nickName,
        })
        console.log('2' +this.data.qrcode_content)
        qrcode.makeCode(this.data.qrcode_content)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            qrcode_content:res.userInfo.nickName,
          })
          console.log('3' +this.data.qrcode_content)
          qrcode.makeCode(this.data.qrcode_content)
        }
      })
    }
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: qrcode_content,
      width: qrcode_w,
      height: qrcode_w,
      colorDark: "#000000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      qrcode_content:e.detail.userInfo.nickName,
    })
    console.log('4' + this.data.qrcode_content)
    var userInfoStr = e.detail.userInfo
    console.log('40' + JSON.stringify(userInfoStr))
    qrcode.makeCode(this.data.qrcode_content)
  }
})
