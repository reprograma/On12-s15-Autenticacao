//const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1]
  console.log(token)
  if (!token) {
    return res.status(403).send({message: "Kd a autorizationnn"})
  }

  // Usar metodo do jwt para autenticar a rota
  // verificação do token com o secret do projeto

  jwt.verify(token, SECRET, async (err) => {
    if (err){
      res.status(403).send({message: '  token não valido', err})
    }
    const estudios = await Estudio.find()
    res.json(estudios)
  })
  
}

const createStudio = async (req, res) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1]
  console.log(token)
  if (!token) {
    return res.status(403).send({message: "Kd a autorizationnn"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if (err){
      res.status(403).send({message: '  token não valido', err})
    }
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
  })

}

module.exports = {
  getAll,
  createStudio
}