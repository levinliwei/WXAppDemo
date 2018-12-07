// pages/reserve/reserve.js

var dateTimePicker = require('../../utils/dateTimePicker.js');
const date = new Date()
const dateWeeks = []
const hours = []
const minutes = []

for (let i = 0; i <= 100; i++) {
  if (i==0) {
    dateWeeks.push("今天")
  } else {
    var addDate = dateTimePicker.getAddDate(i);
    var curWeek = dateTimePicker.getWeekByDate(addDate);
    dateWeeks.push(addDate + " " +curWeek)
  }
}

for (let i = 0; i <= 23; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push(i)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:
      [{ title: "芝华士", amount: "20000", discom: "800", task: "10", checked: false },
      { title: "黑方", amount: "7000", discom: "1222", task: "1", checked: false },
      { title: "格威特", amount: "27700", discom: "123", task: "2", checked: false },
      { title: "麦芽威士忌", amount: "9900", discom: "624", task: "3", checked: false },
      { title: "特价曼哈顿", amount: "800", discom: "1725", task: "4", checked: false },
      { title: "长城干红", amount: "28800", discom: "16", task: "5", checked: false },
      { title: "奔富707", amount: "56600", discom: "27", task: "6", checked: false },
      { title: "红玫瑰", amount: "16000", discom: "908", task: "7", checked: false },
      { title: "鸡尾酒", amount: "20000", discom: "1229", task: "8", checked: false }],
    selectId: -1,
    selectTableValue: "",
    selectTime: "",

    dateWeeks: dateWeeks,
    hours: hours,
    minutes: minutes,
    value: [0, 0, 0], //日期默认选择位置

    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},//
    selectDataWeek: "",
    selectHour: "",
    selectMinute: "",
  },

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      selectDataWeek: this.data.dateWeeks[val[0]],
      selectHour: this.data.hours[val[1]],
      selectMinute: this.data.minutes[val[1]],
    })
  },

  itemSelect: function (e) {
    var that = this
    console.log(e)
    that.setData({
      selectId: e.currentTarget.id,
      selectTableValue: that.data.items[e.currentTarget.id].title + ",￥" + that.data.items[e.currentTarget.id].amount,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(dateTimePicker.getAddDate(0))
  },

  // 显示遮罩层
  showModal: function () {
    var that = this
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
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

  }
})