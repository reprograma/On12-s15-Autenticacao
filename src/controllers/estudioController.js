const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET


const getAll = async (req, res) => {
  // pegar o token inserido no "insomnia"
  const authHeader = req.get('authorization')

  // tirar a palavra "Baerer" (formato necessario para inserir a chave no insomnia)
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(403).send({ message: "Não autorizado." })
  }

  // usar método do jwt para autenticar a rota
  // verifização do token (se ele existe e se é valido) gerado no "login"
  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: "Token invádio." })
  }
  
  const estudios = await Estudio.find()
  res.json(estudios)
  })
}


const createStudio = async (req, res) => {
  
  const token = req.get('authorization').split(' ')[1]
  
  if (!token) {
    return res.status(403).send({ message: "Não autorizado." })
  }
  
  try{

    const estudio = new Estudio({
      _id: new mongoose.Types.ObjectId(),
      nome: req.body.nome,
      criadoEm: req.body.criadoEm,
    })

    jwt.verify(token, SECRET, async (err) => {
      if (err) {
        res.status(500).send({ message: err.message }) 
      } else {
        const estudioRepetido = await Estudio.findOne({nome: req.body.nome})
        if (estudioRepetido) {
          return res.status(409).json({error: 'Estudio ja cadastrado.'})
        } else {
          const novoEstudio = await estudio.save()
          res.status(201).json(novoEstudio)
        }
      }
  })

  } catch(err) {
      res.status(403).send({ message: "Token inválido." })
  }
}


module.exports = {
  getAll,
  createStudio
}