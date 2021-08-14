const Estudio = require('../models/estudio')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const getAll = async (req, res) => {
    // criar autenticação
    // trazeer token do header da requisição
    // verificar se ele existe
      // retornar erro caso não exista
  // caso exista e for válido, enviar a lista como resposta

  // verificar token enviado com o token salvo no env
  const authHeader = req.get('authorization')
  // console.log(authHeader)

  //fazer split para acessar o token propriamente dito
  const token = authHeader.split(' ')[1];
  // console.log(token)
  if (!token) {
    return res.status(401).send("Kd o autorizationnn")
  }
  const estudios = await Estudio.find()
  res.status(200).send(estudios)

  jwt.verify(token, SECRET, (e) => {
    if (e) {
      res.status(403).send({ message: 'Token não válido', e })
    } 
      res.status(200).send(estudios)   
  })
}

const createStudio = async (req, res) => {
  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Estudio ja cadastrado.'})
  }
  try{
    const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
}

module.exports = {
  getAll,
  createStudio
}