const dbUtils = require('./../utils/db-util')

const user = {
  /**
   * 根据用户名密码查找用户
   * @param {object} options 用户名密码对象
   * @return {Promise|null} 查到到的对象
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
  }
}

module.exports = user