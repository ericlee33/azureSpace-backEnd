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
  // nickname: {
  //   type: String,
  //   required: true
  // }
  guest: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Detail', userSchema)
