const getRect = (obj) => {
  return new Promise((revsolve, reject) => {
    obj.boundingClientRect((rect) => {
      revsolve(rect);
    }).exec();
  })
}
// export default {
//   getRect
// }

module.export ={
  getRect:getRect
}    