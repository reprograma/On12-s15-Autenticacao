const Usuaria = require('../models/usuarias')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const create = async (req, res) => {
  // objetivo: criar uma nova usuária
    // acessar os dados da usuária enviado no body
  
  // const senhaComHash = 'senhadificil'
  // const senhaComHash = bcrypt.hashSync(req.body.senha, salt)
  const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
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
      // acessar informações vindas do body
    // achar usuária no banco
    // verificar dados
  Usuaria.findOne({ email: req.body.email }, (err, usuariaEncontrada) => {
    if (!usuariaEncontrada) {
      return res.status(404).send({ message: `${req.body.email}, este email não pertence à nenhuma usuária da base de dados ` })
    }

    // return res.status(200).send({ message: "Login realizado com sucesso"})
    // console.log(usuariaEncontrada)

    const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)
    // console.log(req.body.senha)

    // return res.status(200).send({ message: "Login realizado com sucesso", dados: `${req.body.senha} ${senhaValida}`})

    
    if (!senhaValida) {
      return res.status.send(403).send({message: "Login não autorizado"})
    }
    
            // método repsonsável por gerar o token de login e da sessão
    // const token = jwt.sign({qualquer coisa})
    const token = jwt.sign({email: req.body.email}, SECRET)

    return res.status(200).send({ message: "Login realizado com sucesso", token: token})

  })
}

module.exports = { create, login }