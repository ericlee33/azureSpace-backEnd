const express = require('express')
const User = require('./models/user')
const Blog = require('./models/blog')
const Comment = require('./models/comment')
const MessageBoard = require('./models/messageboard')

// const md5 = require('blueimp-md5')

const router = express.Router()
// =========================================================注册部分==================================================================
// 注册
router.post('/api/register', function (req, res, next) {
  const body = req.body
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

// =========================================================文章部分==================================================================
// 添加web文章
router.post('/api/addblog',function(req,res,next){
  const body = req.body
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

// 获取web文章
router.get('/api/getblog',function(req,res,next){
  Blog.find(function (err, blogs) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    // 数组取反
    blogs.reverse()
    res.status(200).json({
      blogs:blogs
    })
  })
})

// 删除web文章
router.post('/api/deleteblog',function(req,res,nect){

  const id = req.body.id

  Blog.remove({_id: id},(err,i) => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

// router.get('/api/getblog/:id',function(req,res,next){
//   var body = req.body
//   // console.log(body)
 
//   new Blog(body).save(function (err, user) {
//     if (err) {
//       return next(err)
//     }
//     res.status(200).json({
//       err_code: 0,
//       message: 'OK'
//     })
//   })
// })

// 前端请求文章具体数据
router.get('/api/getblog/:id',function(req,res,next){
  // 得到前端请求的id
  const id = req.params.id
  // console.log(id)
  // 在Blog中查找这个id的数据
  Blog.find({_id: id}, (err, bloginfo) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      bloginfo: bloginfo
    })
  })
})

// 更新文章数据
router.post('/api/updateblog/:id',function(req,res,next){
  // 得到前端请求的id
  const id = req.params.id
  // 在Blog中查找这个id的数据
  Blog.update({_id: id}, {title: req.body.title,content: req.body.content}, (err) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

// ===========================================================文章评论部分===========================================================================

// 上传评论
router.post('/api/comment/:id',function(req,res,next){
  const body = req.body
  // console.log(body)
 
  new Comment(body).save(function (err, data) {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })

})

// 前端请求评论数据
router.get('/api/comment/:id',function(req,res,next){
  // 得到前端请求的id
  const id = req.params.id
  // 在Blog中查找这个id的数据
  Comment.find({id: id}, (err, comment) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      err_code: 0,
      comment: comment
    })
  })
})

// ===========================================================messagboard留言板部分========================================================================
router.get('/api/getmessageboard',function(req,res,next){

  MessageBoard.find((err, data) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    data.reverse()
    res.status(200).json({
      err_code: 0,
      data: data
    })
  })
})

router.post('/api/addmessageboard',function(req,res,next){
  const body = req.body

  new MessageBoard(body).save((err, data) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  })
})

router.post('/api/deletemessageboard/:id',function(req,res,next){

  const id = req.params.id
  // console.log(id)

  MessageBoard.remove({_id:id}, (err, data) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  })
})

module.exports = router
