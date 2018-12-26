var page = undefined;
//// domm 对象
var doommList = [];
var i = 0;//用做唯一的wx:key
//  //间隔获取评论的定时器
var setInter;

Page({
  data: {
    doommData: [],
    item: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3595626725,2184021941&fm=26&gp=0.jpg',
    barrageHornIcon: 'https://upload.jianshu.io/users/upload_avatars/6850742/651b060d-deb4-4d6d-b366-45b0af0ba47c?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114/format/webp',
    // banner
    imgUrls: [
      "http://img5.imgtn.bdimg.com/it/u=4214211458,453823117&fm=26&gp=0.jpg",
      "http://img0.imgtn.bdimg.com/it/u=1068288624,915290928&fm=26&gp=0.jpg",
      "http://img1.imgtn.bdimg.com/it/u=3115337612,1186822167&fm=26&gp=0.jpg",
      "http://img3.imgtn.bdimg.com/it/u=3951770777,3406736720&fm=26&gp=0.jpg",
      "http://img4.imgtn.bdimg.com/it/u=3455576886,2752427372&fm=26&gp=0.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },
  onLoad: function () {
    page = this;
    setInter = setInterval(this.timerGetCommentData, 1000);
    this.$wuxRater = App.Wux().$wuxRater
		this.$wuxRater.init('star', {
			value: 5, 
		})
		this.$wuxRater.init('changeColor', {
			value: 3, 
			activeColor: '#04BE02', 
		})
  },
  onReady: function () {
    console.log('===un onReady====', doommList.length)
  },
  onUnload: function () {
    resetData();
    console.log('===un load====')
  },
  ///定时从服务器获取评论
  timerGetCommentData: function () {
    const data = this.data;
    function getInitTemp(speed, content, top, delay) {
      return {
        x: 0,
        top: top,
        speed: speed,
        content: content,
        styleObj: {},
        realStyle: '',
        delay: delay
      }
    }
    function getRandom(min, max) { // 获取区间（min到max）随机数
      const result = Math.random() * (max - min) + min;
      return result;
    }
    for (let i = 0; i < 5; i++) {
      const speed = getRandom(2, 12);
      const content = 'DJS的点点滴滴多多多dfgdfgdfg电饭锅地方规定发给';
      const top = getRandom(0, 300);
      const delay = i * 6 + getRandom(0, 2);
      const tempObj = getInitTemp(speed, content, top, delay);
      data.doommData.push(tempObj);
    }
    this.setData({
      doommData: data.doommData
    });

    console.log('===timerGetCommentData====')
    for (let item of data.doommData) {
      console.log(item.top)
      item.styleObj.top = ":" + item.top + "px;";
      item.styleObj.transform = ":translateX(-100%);";
      item.styleObj.transition = ":all " + item.speed + "s ease-in-out " + item.delay + "s;";
      for (let key in item.styleObj) { // 拼接行间样式字符串
        item.realStyle += (key + item.styleObj[key]);
      }
    }
    this.setData({
      doommData: data.doommData
    })
  },

  //分享
  onShareAppMessage: function () {
    return {
      title: '当前酒吧'
    }
  },
})

//数据重置
function resetData() {
  //清除定时器
  clearInterval(setInter);
  doommList = []; //list置空
  i = 0;
}

class Doomm {
  /**
   * 
   * @param {*} text 显示的弹幕内容
   * @param {*} image 图像
   * @param {*} top  距离顶部距离
   * @param {*} time  延时时长
   * @param {*} color  弹幕内容的颜色
   * @param {*} realStyle  弹幕动画
   */
  constructor(text, image, top, time, color, realStyle) {
    this.text = text;
    this.image = image;
    this.top = top;
    this.time = time;
    this.color = color;
    this.realStyle = realStyle;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)//定时器动画完成后执行。
  }
}
/**
 * 获取随机颜色值
 */
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
