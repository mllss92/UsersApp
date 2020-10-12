

const tryLogin = (obj) => {
  obj.mark = 'from server';
  return obj;
}


module.exports = {
  tryLogin
}