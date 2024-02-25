// --------------- 装饰器 -------------
function isLogin(status) {
  return function (target) {
    target.isLogin = status
  }
}

// @isLogin(false)
class Button {
}
console.log(Button, new Button())