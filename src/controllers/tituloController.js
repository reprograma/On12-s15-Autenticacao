const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(403).send({message: "Insira o Token"})
  }
  jwt.verify(token, SECRET, async (err) => {
    if(err) {
      res.status(403).send({message: "Token não válido", err})
    }
    const titulos = await Titulo.find().populate('estudio')
    res.status(200).json(titulos)
  })
}

const createTitle = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]
  console.log(token)
  if (!token) {
    return res.status(403).send({message: "Insira o token"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if(err) {
      res.status(403).send({message: "Token não válido", err})
    }
    const titulo = new Titulo({
      _id: new mongoose.Types.ObjectId(),
      nome: req.body.nome,
      genero: req.body.genero,
      descricao: req.body.descricao,
      estudio: req.body.estudio,
      criadoEm: req.body.criadoEm
    })
    //TODO : criar validação se filme já existe
    try {
      const novoTitulo = await titulo.save()
      res.status(201).json(novoTitulo)
    } catch (err) {
      res.status(400).json({ message: err.message})
    }
  })
}

module.exports = {
  getAll,
  createTitle
}