const dbUtils = require('./../utils/db-util')

const user = {
  /**
   * @method 
   * @param {object} options 用户名密码对象
   * @return {Array|null} 查到到的对象
   * @desc 根据用户名密码查找用户
   */
  async getOneByUserNameAndPassword(options) {
    var _sql = `
    SELECT * FROM user_info
    WHERE password="${options.password}" and name="${options.username}"
    LIMIT 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   * @method
   * @param {object} options 查找条件参数
   * @return {Array|null} 查找到的对象
   * @desc 查找是否存在用户信息
   */
  async getExistOneUserInfo (options) {
    let _sql = `
    SELECT * FROM user_info
    WHERE name="${options.name}" or email="${options.email}"
    LIMIT 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   * @method
   * @param {object} options 用户注册数据
   * @return {object} mysql执行结果
   * @desc 新建一条用户记录
   */
  async createUser (options) {
    let _sql = "INSERT INTO ?? SET ?"
    let result = await dbUtils.query(_sql, [ 'user_info', options ])
    return result
  }

}

module.exports = user