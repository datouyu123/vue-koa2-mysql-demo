/**
 * 用户业务操作
 */
const validator = require('validator')
const userModel = require('./../models/user')
const userCode = require('../utils/userCode')


const user = {
  /**
   * @method 登录业务操作
   * @param {object} data 登录信息
   * @return {Promise} 登录业务操作结果
   */
  async signIn(data) {
    return await userModel.getOneByUserNameAndPassword({
      "password": data.password,
      "username": data.username
    })
  },
  /**
   * @method 
   * @param {object} userInfo 用户数据
   * @return {object} 过滤结果
   * @desc 检查用户注册数据
   */
  validatorSignUp (userInfo) {
    let result = {
      ret: -1,
      msg: ''
    }
    if (/^[0-9a-zA-Z\-\_]{6,16}$/.test( userInfo.username ) === false) {
      result.msg = userCode.ERROR_USERNAME
      return result
    }
    if (!validator.isEmail( userInfo.email )) {
      result.msg = userCode.ERROR_EMAIL
      return result
    }
    if (!/\w{6,16}/.test(userInfo.password)) {
      result.msg = userCode.ERROR_PASSWORD
      return result
    }
    result.ret = 0
    return result    
  },
  /**
   * @method
   * @param {object} formData 表单数据
   * @return {object} 查找结果
   * @desc 根据用户名或邮箱查找用户
   */
  async getExistOneUserInfo (formData) {
    let result = await userModel.getExistOneUserInfo({
      'email' : formData.email,
      'name' : formData.username
    })
    return result
  },
  /**
   * @method
   * @param {object} userInfo 用户数据
   * @return 新增用户结果
   * @desc 新增一条用户记录
   */
  async createUser (userInfo) {
    let result = await userModel.createUser(userInfo)
    return result
  },
  // 根据id获取用户信息
  async getUserDetailById (id) {
    let result = await userModel.getUserDetailById(id)
    return result
  }
}

module.exports = user