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
module.exports = {
  isSetPayPwd
}