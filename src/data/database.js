const mongoose = require('mongoose')
require('dotenv-safe').config()

const MONGOURL = process.env.MONGODB_URL
const connect = () => {mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Database conectada com sucesso.'))
  .catch(err => console.err)
}

module.exports = { connect }