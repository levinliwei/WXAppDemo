// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    table: "",
    time: "",

    // banner
    imgUrls: [
      "http://img5.imgtn.bdimg.com/it/u=4214211458,453823117&fm=26&gp=0.jpg",
      "http://img0.imgtn.bdimg.com/it/u=1068288624,915290928&fm=26&gp=0.jpg",
      "http://img1.imgtn.bdimg.com/it/u=3115337612,1186822167&fm=26&gp=0.jpg",
      "http://img3.imgtn.bdimg.com/it/u=3951770777,3406736720&fm=26&gp=0.jpg",
      "http://img4.imgtn.bdimg.com/it/u=3455576886,2752427372&fm=26&gp=0.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: false, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },

   //预览图片
   previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('onLoad is invoked');
    console.log(options);
    that.setData({
      table: options.table,
      time: options.time,
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