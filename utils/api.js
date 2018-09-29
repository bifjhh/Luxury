function isSetPayPwd(params) {
  let promise = new Promise(function (resolve, reject) {
    wx.$http('/User/isSetPayPwd', params).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
  return promise;
}
function getExpressInfo(params) {
  let promise = new Promise(function (resolve, reject) {
    wx.$http('/Order/getExpressInfo', params).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
  return promise;
}
function confirmOrCancel(params) {
  let promise = new Promise(function (resolve, reject) {
    wx.$http('Order/confirmOrCancel', params).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
  return promise;
}
module.exports = {
  isSetPayPwd,
  getExpressInfo,
  confirmOrCancel
}