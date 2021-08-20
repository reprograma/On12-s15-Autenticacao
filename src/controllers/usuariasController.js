const Usuaria = require('../models/usuarias')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const create = async (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
  req.body.senha = senhaComHash

  const usuaria = new Usuaria(req.body)
  // verificar se usuaria já existe no banco de dados
  const usuariaJaExiste = await Usuaria.findOne({email: req.body.email})
  
  if (usuariaJaExiste) {
    return res.status(409).json({error: 'usuaria ja cadastrado.'})
  }
  try {
    const novaUsuaria = await usuaria.save()
    res.status(201).json(novaUsuaria)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const login = (req, res) => {
  Usuaria.findOne({ email: req.body.email}, (err, usuariaEncontrada) => {
    if (!usuariaEncontrada) {
      return res.status(404).send({message: 'Usuario não encontrado'})
    }
    // se o usuario for encontrado no banco de dados
    const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)

    if (!senhaValida) {
      return res.status(401).send({message: "Login não autorizado"})
    }
    // gerar token de acesso
    const token = jwt.sign({email: req.body.email}, SECRET)
    res.status(200).send({ messagem: "Login realizado com sucesso", token: token})
  })
}

// Buscar usuária a partir do email recebido na request, e mostrar um erro 404 caso não encontre
const emailUsuaria = async (req, res) => {
  const email = await Usuaria.findOne({ email: req.body.email})
  try {
    res.status(201).json(email)
  } catch {
    res.status(404).json({message: 'usuario não encontrado'})
  }
}
// jwt.sign({ name: usuaria.name }, SECRET);

module.exports = { create, login, emailUsuaria }