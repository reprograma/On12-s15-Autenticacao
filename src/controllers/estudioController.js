const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(403).send({message: "Kd a tokenzinnn"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: 'Token não válido', err})
    }

    const estudios = await Estudio.find() 
    res.json(estudios)
  })
}

const createStudio = async (req, res) => {
  const authHeader = req.get('authorization')
  const token = authHeader.split(' ')[1]
  if(!token){
    return res.status(403).send({ message: "Solicita autorização"})
  }
  jwt.verify(token, SECRET, async (err) => {
    if(err){
      res.status(403).send({ message: 'Token inválido', err})
    }

  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Já existe cadastro para este estudio!'})
  }
  try{
    const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
  })
}

module.exports = {
  getAll,
  createStudio
}