const mongoose = require('mongoose')
const Titulo = require('../models/titulo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getId = async (req, res) => {
  const getTituloById = await Titulo.findById(req.params.id)
  Titulo.findOne({ id: req.params.id },
    function (err) {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.status(200).json(getTituloById)
      }
    })
}

const getAll = async (req, res) => {

  const titulos = await Titulo.find().populate('estudio')
  res.status(200).json(titulos)

  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]
  

  if (!token) {
    return res.status(403).send({ message: "onde esta o token" })
  }

  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: 'Token não válido', err })
    }

    const titulo = await Titulo.find()
    res.json(titulo)
  })
}

const createTitle = async (req, res) => {

  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if (!token) {
      return res.status(403).send({ message: "onde esta o token" })
  }

  jwt.verify(token, SECRET, async (err) => {
      if (err) {
          res.status(403).send({ message: 'Token não válido', err })
      }


  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  })

  try {
    const novoTitulo = await titulo.save()
    res.status(201).json(novoTitulo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

  })

};




const deletaTitulo = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]


  if (!token) {
      return res.status(403).send({ message: "onde esta o token" })
  }

  jwt.verify(token, SECRET, async (err) => {
      if (err) {
          res.status(403).send({ message: 'Token não válido', err })
      }

      const encontraTitulo = await Titulo.findById(req.params.id)
      if (encontraTitulo == null) {
          return res.status(404).json({ message: 'titulo não foi encontrado.' })
      }

      try {
          await encontraTitulo.remove()
          res.status(200).json({ message: 'titulo deletado com sucesso' })
      } catch (err) {
          res.status(500).json({ message: err.message })
      }
    })

  }


module.exports = {
  getId,
  getAll,
  createTitle,
  deletaTitulo,

}