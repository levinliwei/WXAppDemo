// pages/reserve_list/reserve_list.js
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
  },

  /***
   * item 点击事件
   */
  itemClick:function(e) {
    wx.navigateTo({
      url: '../search/search',
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