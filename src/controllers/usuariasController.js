const Usuaria = require('../models/usuarias')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const create = async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.senha, 10)
  req.body.senha = passwordHash

  const usuaria = new Usuaria(req.body)

  try {
    const newUser = await usuaria.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const login = (req, res) => {
  Usuaria.findOne({ email: req.body.email }, (err, usuariaEncontrada) => {
    
    if (!usuariaEncontrada) {
      return res.status(404).send({ message: 'Usuária não foi encontrada', email: `${req.body.email}`})
    }

    const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)
    if (!senhaValida) {
      return res.status(401).send({message: "Login não foi autorizado"})
    }

    const token = jwt.sign({email: req.body.email}, SECRET)
    res.status(200).send({ messagem: "Login realizado com sucesso!", token: token})
  })
}

module.exports = { create, login }