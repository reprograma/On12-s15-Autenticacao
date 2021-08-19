const mongoose = require('mongoose')
<<<<<<< HEAD
const MONGODB = process.env.MONGODB_URL

const connect = () => {
  mongoose.connect(MONGODB, {
=======
const MONGODB=process.env.MONGODB_URL

const connect = () => {mongoose.connect
  (MONGODB,{
>>>>>>> afef92b (criando camadas de segurança a API)
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Database conectada com sucesso.'))
  .catch(err => console.err)
}

module.exports = { connect }