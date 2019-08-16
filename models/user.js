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
  username: {
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
  }
})

module.exports = mongoose.model('User', userSchema)
