// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:
      [{
        label: "A",
        data: [{ name: "铁拐李", phone: "13500090009", discom: "800", task: "10", checked: false },
        { name: "剃头牛", phone: "13500090009", discom: "1222", task: "1", checked: false },
        { name: "张小艺", phone: "13500090009", discom: "123", task: "2", checked: false },
        { name: "张广泰", phone: "13500090009", discom: "624", task: "3", checked: false },
        { name: "朱天飞", phone: "13500090009", discom: "1725", task: "4", checked: false },
        { name: "刘老三", phone: "13500090009", discom: "16", task: "5", checked: false },
        { name: "王二麻子", phone: "13500090009", discom: "27", task: "6", checked: false },
        { name: "白芍药", phone: "13500090009", discom: "908", task: "7", checked: false },
        { name: "哈大人", phone: "13500090009", discom: "1229", task: "8", checked: false }]
      },
      {
        label: "B",
        data: [{ name: "铁拐李", phone: "13500090009", discom: "800", task: "10", checked: false },
        { name: "剃头牛", phone: "13500090009", discom: "1222", task: "1", checked: false },
        { name: "张小艺", phone: "13500090009", discom: "123", task: "2", checked: false },
        { name: "张广泰", phone: "13500090009", discom: "624", task: "3", checked: false },
        { name: "朱天飞", phone: "13500090009", discom: "1725", task: "4", checked: false },
        { name: "刘老三", phone: "13500090009", discom: "16", task: "5", checked: false },
        { name: "王二麻子", phone: "13500090009", discom: "27", task: "6", checked: false },
        { name: "白芍药", phone: "13500090009", discom: "908", task: "7", checked: false },
        { name: "哈大人", phone: "13500090009", discom: "1229", task: "8", checked: false }]
      },
      {
        label: "C",
        data: [{ name: "铁拐李", phone: "13500090009", discom: "800", task: "10", checked: false },
        { name: "剃头牛", phone: "13500090009", discom: "1222", task: "1", checked: false },
        { name: "张小艺", phone: "13500090009", discom: "123", task: "2", checked: false },
        { name: "张广泰", phone: "13500090009", discom: "624", task: "3", checked: false },
        { name: "朱天飞", phone: "13500090009", discom: "1725", task: "4", checked: false },
        { name: "刘老三", phone: "13500090009", discom: "16", task: "5", checked: false },
        { name: "王二麻子", phone: "13500090009", discom: "27", task: "6", checked: false },
        { name: "白芍药", phone: "13500090009", discom: "908", task: "7", checked: false },
        { name: "哈大人", phone: "13500090009", discom: "1229", task: "8", checked: false }]
      },
      {
        label: "D",
        data: [{ name: "铁拐李", phone: "13500090009", discom: "800", task: "10", checked: false },
        { name: "剃头牛", phone: "13500090009", discom: "1222", task: "1", checked: false },
        { name: "张小艺", phone: "13500090009", discom: "123", task: "2", checked: false },
        { name: "张广泰", phone: "13500090009", discom: "624", task: "3", checked: false },
        { name: "朱天飞", phone: "13500090009", discom: "1725", task: "4", checked: false },
        { name: "刘老三", phone: "13500090009", discom: "16", task: "5", checked: false },
        { name: "王二麻子", phone: "13500090009", discom: "27", task: "6", checked: false },
        { name: "白芍药", phone: "13500090009", discom: "908", task: "7", checked: false },
        { name: "哈大人", phone: "13500090009", discom: "1229", task: "8", checked: false }]
      },
      {
        label: "E",
        data: [{ name: "铁拐李", phone: "13500090009", discom: "800", task: "10", checked: false },
        { name: "剃头牛", phone: "13500090009", discom: "1222", task: "1", checked: false },
        { name: "张小艺", phone: "13500090009", discom: "123", task: "2", checked: false },
        { name: "张广泰", phone: "13500090009", discom: "624", task: "3", checked: false },
        { name: "朱天飞", phone: "13500090009", discom: "1725", task: "4", checked: false },
        { name: "刘老三", phone: "13500090009", discom: "16", task: "5", checked: false },
        { name: "王二麻子", phone: "13500090009", discom: "27", task: "6", checked: false },
        { name: "白芍药", phone: "13500090009", discom: "908", task: "7", checked: false },
        { name: "哈大人", phone: "13500090009", discom: "1229", task: "8", checked: false }]
      }],
    selectId: -1,
    scrollTop: 0,
    scrollPos:0,
    tp_value:'Tp_Btn',
  },

  selectSubUser:function(e) {
    console.log(e)
    console.log("用户位置：" + e.currentTarget.id)
    wx.showToast({
      title:"选择==>",
    })
  },

  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  //页面滚动执行方式
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop,
      // scrollPos:event.in,
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