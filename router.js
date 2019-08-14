var express = require('express')
var User = require('./models/user')
var Blog = require('./models/blog')
// var md5 = require('blueimp-md5')

var router = express.Router()

router.post('/api/register', function (req, res, next) {
  var body = req.body
  // console.log(body)
 
  new User(body).save(function (err, user) {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.post('/api/addblog',function(req,res,next){
  var body = req.body
  // console.log(body)
 
  new Blog(body).save(function (err, user) {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })

})

router.get('/api/getblog',function(req,res,next){
  Blog.find(function (err, blogs) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      blogs:blogs
    })
  })
})
module.exports = router
