const userService = require('./../services/user')
const createToken = require('./../tokens/createToken')
const userCode = require('../utils/userCode')

module.exports = {
  /**
   * 登录操作
   * @param username 
   * @param password
   * @return id 用户自增id
   * @return token
   */
  async signIn(ctx) {
    let formData = ctx.request.body
    let result = {
      ret: -1,
      msg: '',
      data: {}
    }
    let userResult = await userService.signIn(formData)
    if (userResult) {
      result.ret = 0
      result.msg = '登录成功'
      // 生成token并返回前端
      let token = createToken(userResult.name)
      result.data.token = token
      result.data.id = userResult.id
    } else {
      result.msg = '账号或密码错误'
    }
    ctx.body = result
  },
  /**
   * 注册
   */
  async signUp(ctx) {
    let formData = ctx.request.body
    let result = {
      ret: -1,
      msg: '',
      data: {}
    }
    // 检查用户输入的注册数据
    let validateResult = userService.validatorSignUp(formData)
    // 数据格式不符
    if (validateResult.ret === -1) {
      result = validateResult
      ctx.body = result
      return
    }
    // 检测是否已有注册的邮箱或用户名
    let existOne = await userService.getExistOneUserInfo(formData)
    if (existOne) {
      if (existOne.name === formData.username) {
        result.msg = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        result.msg = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }
    // 不存在注册的记录，新建一条数据注册账号
    let createResult = await userService.createUser({
      email: formData.email,
      name: formData.username,
      password: formData.password,
      create_time: new Date().getTime(),
    })
    if ( createResult && createResult.insertId * 1 > 0) {
      result.ret = 0
      result.msg = userCode.SIGN_UP_SUCCESS
    } else {
      result.message = userCode.SYSTEM_ERROR
    }
    ctx.body = result
    return 
  },
  /**
   * 获取个人信息详情
   */
  async getUserDetailById(ctx) {
    let formData = ctx.request.query
    let result = {
      ret: -1,
      msg: '',
      data: {}
    }
    if (formData.id) {
      let userResult = await userService.getUserDetailById(formData.id)
      if (userResult) {
        result.ret = 0
        result.msg = userCode.SUCCESS
        result.data = userResult
      } else {
        result.ret = -1
        result.msg = userCode.USERINFO_NOT_EXIST
      }
    } else {
      result.ret = -1
      result.msg = userCode.PARAM_ERROR
    }
    ctx.body = result
    return
  }
}