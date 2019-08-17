var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true},function(err){
  if(err){
    console.log('Connect error:' + err)
  }else{
    console.log('Connect success' )
  }
})

var Schema = mongoose.Schema

var userSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
