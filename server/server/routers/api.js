/**
 * restful api 子路由
 */
const userController = require('./../controllers/user')
const Router = require('koa-router')
const apiRouter = new Router()

//checkToken作为中间件存在
const checkToken = require('./../tokens/checkToken.js')
apiRouter.post('/signin', userController.signIn)
apiRouter.post('/signup', userController.signUp)
apiRouter.get('/getUserDetail', checkToken, userController.getUserDetailById)

module.exports = apiRouter