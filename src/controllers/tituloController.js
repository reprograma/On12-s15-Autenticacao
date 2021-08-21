const mongoose = require('mongoose')
const Titulo = require('../models/titulo')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET


const getAll = async (req, res) => {

  const token = req.get('authorization').split(' ')[1]
  
  if (!token) {
    return res.status(403).send({ message: "Não autorizado." })
  }

  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      return res.status().send({ message: "Token inválido." })
    } else {
      const titulos = await Titulo.find().populate('estudio')
      res.status(200).send(titulos)
    }
  })
}


const createTitle = async (req, res) => {
  
  const token = req.get('authorization').split(' ')[1]
  
  //TODO : criar validação se filme já existe
  if (!token) {
    return res.status(403).send({ message: "Não autorizado." })
  }

  try {
    const titulo = new Titulo({
      _id: new mongoose.Types.ObjectId(),
      nome: req.body.nome,
      genero: req.body.genero,
      descricao: req.body.descricao,
      estudio: req.body.estudio,
      criadoEm: req.body.criadoEm
    })

    jwt.verify(token, SECRET, async (err) => {
      if (err) {
        res.status(403).send({ message: "Token inválido." })
      } else {
        const tituloRepetido = await Titulo.findOne({ nome: req.body.nome })
        if (tituloRepetido) {
          res.status(409).send({ error: "Título já cadastrado." })
        } else {
          const novoTitulo = await titulo.save()
          res.status(201).json(novoTitulo)
        }
      }
    })

  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

module.exports = {
  getAll,
  createTitle
}