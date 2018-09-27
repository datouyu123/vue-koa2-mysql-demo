const userService = require('./../services/user')

module.exports = {
  /**
   * @method 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn(ctx) {
    let formData = ctx.request.body
    console.dir(formData)
    let result = {
      ret: -1,
      msg: '',
    }
    let userResult = await userService.signIn(formData)
    if (userResult) {
      result.ret = 0
      result.msg = '登录成功'
    } else {
      result.msg = '账号或密码错误'
    }
    ctx.body = result
  }
}