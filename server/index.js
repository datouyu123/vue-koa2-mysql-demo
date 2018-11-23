const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const routers = require('./server/routers/index')
const cors = require('koa2-cors')

const app = new Koa()

// 配置控制台日志中间件
app.use(koaLogger())

// cors配置
app.use(cors({
  origin: function(ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 1000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'HEAD'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000, () => {
  console.log('The server is running at http://localhost:' + 3000);
});