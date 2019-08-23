var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

// 静态目录
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.set('views', path.join(__dirname, './views/'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// 把路由挂载到 app 中
app.use(router)

// 监听3000端口
app.listen(3000, function () {
  console.log('running...')
})
