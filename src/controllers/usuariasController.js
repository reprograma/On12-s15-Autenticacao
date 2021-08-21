const Usuaria = require('../models/usuarias')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const create = async (req, res) => {
  // objetivo: criar uma nova usuária
    // acessar os dados da usuária enviado no body
  
  // "10" é o numero de bits do hash
  const senhaComHash = bcrypt.hashSync(req.body.senha, 10)

  // reatribuição de valor com a senha inserida no body
  req.body.senha = senhaComHash

  const usuaria = new Usuaria(req.body)
  // console.log('USUARIA', usuaria)

  try {
    const novaUsuaria = await usuaria.save()
    res.status(201).json(novaUsuaria)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}



const login = (req, res) => {
  Usuaria.findOne({ email: req.body.email }, (err, usuariaEncontrada) => {
    if (!usuariaEncontrada) {
      // early return: (otimiza tempo de processamento)
      return res.status(404).send({ message: "Usuária não encontrada", email: `${req.body.email}` })
    }

    // de hash > senha (retorna um boolean)
    const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)
    if (!senhaValida) {
      return res.status(401).send({ message: "Login não autorizado" })
    }
    // criando um token e armazenando na variável "token"
    const token = jwt.sign({ email: req.body.email }, SECRET)

    res.status(200).send({ message: "Login realizado com sucesso!", token: token })
  })
}

module.exports = { create, login }