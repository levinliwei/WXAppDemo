
export function showToast(msg: string | undefined) {
  if(msg == undefined){
    return;
  }
  const option: wx.ShowToastOption = {
    title: msg,
    duration: 2000,
    icon: "none"
  }
  wx.showToast(option);
}

export function showLoading(msg: string = "加载中", mask: boolean = true,timeout:number=-1) {
  wx.showLoading({
    title: msg,
    mask: mask,
  });
  if(timeout>0){
    setTimeout(function(){
      hideLoading();
    },timeout);
  }
}

export function hideLoading() {
  wx.hideLoading({});
}

export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export function isNullOrEmpty(obj:any){
  return obj == null || obj == undefined || (typeof obj =='string' && obj.length==0);
}

// 分转化为元
export function fen2Yuan(num?:number|string): number{
  if(typeof num == 'string'){
    num = parseFloat(num);
  }
  return num ? parseFloat((num / 100).toFixed(2)) : 0;
}

//金额为元，添加千分位
export function formatYuan(num?:number|string): string{
  num = fen2Yuan(num);
  const str:string = num.toString().replace(/(\d{1,3})(?=(\d{3})+.*$)/g,'$1,');
  return str;
}

// 分转化为元，并添加千分位
export function fen2YuanFormmatted(num?:number|string): string{
  num = fen2Yuan(num);
  return formatYuan(num);
}

