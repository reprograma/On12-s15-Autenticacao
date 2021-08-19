const Usuaria = require('../models/usuarias')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const create = async (req, res) => {
  // objetivo: criar uma nova usuária
    // acessar os dados da usuária enviado no body
  
  // const senhaComHash = 'senhadificil'
//   const senhaComHash = bcrypt.hashSync(req.body.senha, salt)
  const senhaComHash = bcrypt.hashSync(req.body.senha, 8)
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
    // console.log(usuariaEncontrada)
    if (!usuariaEncontrada) {
      return res.status(404).send({ message: 'Usuária não encontrada', email: `${req.body.email}`})
    }
    // console.log('SENHA DO BODY', req.body.senha)
    // console.log('SENHA DO BANCO', usuariaEncontrada.senha)

    const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)
    // console.log(senhaValida)

    if (!senhaValida) {
      return res.status(401).send({message: "Login não autorizado"})
    }

    const token = jwt.sign({email: req.body.email}, SECRET)
    res.status(200).send({ messagem: "Login realizado com sucesso", token: token})
})
// const login = (req, res) => {
//     Usuaria.findOne({ email: res.body.email }, (err, usuariaEncontrada) => {
//         if (!usuariaEncontrada){
//             return res.status(404).usuariaEncontrada({message: 'Usuaria nao encontrada', email: '${req.body.email}'})
//         }

//         const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha )
        
//         if(!senhaValida){
//            return res.status(401).send({messagem: "Login não autorizado"})
//         }
//         const token = jwt.sign({email: req.body.email}, SECRET)
//         res.status(200).send({messagem: "Login realizado com sucesso", token: token})
//     })
}

module.exports = { create, login }