/**
 * 用户业务操作
 */
const userModel = require('./../models/user')

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
  }
}

module.exports = user