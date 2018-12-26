module.exports = {
      animationMiddleHeaderItem: animationMiddleHeaderItem,//心跳动画
      animationUpDownItem: animationUpDownItem,//上下弹动动画
}

// 心跳动画 往外扩张
function animationMiddleHeaderItem(that) {
      var circleCount = 0;
      // 心跳的外框动画  
      that.animationMiddleHeaderItem = wx.createAnimation({
            duration: 1000,    // 以毫秒为单位  
            timingFunction: 'linear',
            delay: 100,
            transformOrigin: '50% 50%',
            success: function (res) {
            }
      });
      setInterval(function () {
            if (circleCount % 2 == 0) {
                  that.animationMiddleHeaderItem.scale(1.3).step();
            } else {
                  that.animationMiddleHeaderItem.scale(1.0).step();
            }

            that.setData({
                  animationMiddleHeaderItem: that.animationMiddleHeaderItem.export()  //输出动画
            });

            circleCount++;
            if (circleCount == 1000) {
                  circleCount = 0;
            }
      }.bind(this), 1000);
      return that.animationMiddleHeaderItem;
}

// 上下弹动
function animationUpDownItem(that) {
      var circleCount = 0;
       /**
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      that.animationUpDownItem = wx.createAnimation({
            duration: 1000,    // 以毫秒为单位  
            timingFunction: 'ease-in-out',
            delay: 100,
            success: function (res) {
            }
      });
      setInterval(function () {
            if (circleCount % 2 == 0) {
                  //Y轴上下移动30 偏移量 
                  that.animationUpDownItem.opacity(1.0).translateY(30).step()
            } else {
                  that.animationUpDownItem.opacity(1.0).translateY(0).step()
            }
            that.setData({
                  animationUpDownItem: that.animationUpDownItem.export()  //输出动画
            });

            circleCount++;
            if (circleCount == 1000) {
                  circleCount = 0;
            }
      }.bind(this), 1000);
      return that.animationUpDownItem;
}