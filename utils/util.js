const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  mtData: mtData,
  searchmtdata: searchmtdata,
}

var mt_data = mtData()
function searchmtdata(id) {
  var result
  for (let i = 0; i < mt_data.list.length; i++) {
      var mt = mt_data.list[i]
      if (mt.id == id) {
          result = mt
      }
  }
  return result || {}
}

function mtData() {
  var data = {
    list: [
      {
        id: '1',
        MTId: 'MT001',
        status: 'working',
        Duration: 3,
        Operator: 'tom',
        IdleReason: 'lunch',
        content: '这个是第一个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }, {
        id: '2',
        MTId: 'MT002',
        status: 'Idle',
        Duration: 7,
        Operator: 'jerry',
        IdleReason: 'reparied',
        content: '这个是第二个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }, {
        id: '3',
        MTId: 'MT003',
        status: 'Idle',
        Duration: 6,
        Operator: 'tom',
        IdleReason: 'lunch',
        content: '这个是第三个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }, {
        id: '4',
        MTId: 'MT004',
        status: 'working',
        Duration: 9,
        Operator: 'jerry',
        IdleReason: 'reparied'
        ,
        content: '这个是第二个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }, {
        id: '5',
        MTId: 'MT005',
        status: 'Idle',
        Duration: 2,
        Operator: 'tom',
        IdleReason: 'lunch',
        content: '这个是第二个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }, {
        id: '6',
        MTId: 'MT006',
        status: 'working',
        Duration: 6,
        Operator: 'jerry',
        IdleReason: 'reparied',
        content: '这个是第二个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }, {
        id: '7',
        MTId: 'MT007',
        status: 'Idle',
        Duration: 1,
        Operator: 'tom',
        IdleReason: 'lunch',
        content: '这个是第二个',
        answer: '对的呀',
        myAnswer:'不对',
        description:'这是一个描述文件'
      }
    ]
  }
  return data
}
