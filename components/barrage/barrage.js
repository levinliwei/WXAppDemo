var barrageSource = require('../../utils/barrageSource.js')
Component({
  properties: {
    barrageData: {
      type: Array,
      value: []
    },
    barrageDelay: {
      type: Number,
      value: 2000
    }
  },
  data: {
    sw: 0,
    bh: 0,
    itemPrefix: "barrage",
    deviceInfo: null,
    currentBarrageData: [],
  },
  methods: {
    init: async function() {
      const data = this.data;
      // const query = wx.createSelectorQuery().in(this); // 创建一个用于获取组件内元素的查询对象
      // const box = query.select('#barrage-text-box');
      // const boxRect = await barrageSource.getRect(box);
      // data.bh = boxRect.height;
      data.bh = 30;
      this.currentBarrageDataInit();
      this.beginPosition();
    },
    currentBarrageDataInit: function() { // 初始化等使用的数组对象
      const data = this.data;
      function getInitTemp(speed, content, top, delay) {
        return {
          x: 0,
          top: top,
          speed: speed,
          content: content,
          styleObj: {},
          realStyle: "",
          delay: delay
        }
      }
      for (let i = 0; i < data.barrageData.length; i++) {
        const speed = this.getRandom(7, 17);
        const content = data.barrageData[i].barrageContent;
        const top = this.getRandom(0, 160);
        const delay = i * 6 + this.getRandom(0, 2);
        const tempObj = getInitTemp(speed, content, top, delay);
        data.currentBarrageData.push(tempObj);
      }
      this.setData({
        currentBarrageData: data.currentBarrageData
      });
    },
    getRandom: function(min, max) { // 获取区间（min到max）随机数
      const result = Math.random() * (max - min) + min;
      return result;
    },
    setStyle: function() {
      const data = this.data;
      for (let item of data.currentBarrageData) {
        item.styleObj.top = ":" + item.top + "px;";
        item.styleObj.transform = ":translateX(-100%);";
        item.styleObj.transition = ":all " + item.speed + "s ease-in-out " + item.delay + "s;";
        for (let key in item.styleObj) { // 拼接行间样式字符串
          item.realStyle += (key + item.styleObj[key]);
        }
      }
      this.setData({ // 把行间样式应用到元素上
        currentBarrageData: data.currentBarrageData
      });
    },
    getDeviceBasicInfo: function() { // 获取设置基本信息
      const data = this.data;
      data.deviceInfo = wx.getSystemInfoSync(); // 设备基本信息对象
      data.sw = data.deviceInfo.screenWidth; // 屏幕宽度
    },
    beginPosition: function() {
      this.setStyle();
    },
  },
  ready: async function() {
    this.getDeviceBasicInfo();
    this.init();
  }
});