const mongoose = require('mongoose')

const usuariasSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
})

<<<<<<< HEAD
module.exports = mongoose.model('usuarias', usuariasSchema)
=======
module.exports = mongoose.model('usuarias', usuariasSchema)
>>>>>>> afef92b (criando camadas de segurança a API)
