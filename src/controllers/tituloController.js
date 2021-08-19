const mongoose = require('mongoose')
const Titulo = require('../models/titulo')
const jwt=require('jsonwebtoken')
const SECRET=process.env.SECRET
const bcrypt=require('bcrypt')

const getAll = async (req, res) => {
  
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]
  // console.log(token)

  if (!token) {
    return res.status(403).send({message: "Onde está o token"})
  }
  
  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: 'Token não válido', err})
    }
    const titulos = await Titulo.find().populate('estudio')
    res.status(200).json(titulos)
    
  })
}

const createTitle = async (req, res) => {

  const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
  req.body.senha = senhaComHash 

  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm,
    senha:req.body.senha
  })
  //TODO : criar validação se filme já existe
  try {
    const novoTitulo = await titulo.save()
    res.status(201).json(novoTitulo)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const createLogin=(req,res)=>{
  Titulo.findOne({ nome: req.body.nome}, (err, tituloEncontrado)=> {
    if(!tituloEncontrado){
        return res.status(404).send({message:'tituloEncontrado', nome:`${req.body.nome}`})
    }

    const senhaValida= bcrypt.compareSync(req.body.senha, tituloEncontrado.senha)

    if(!senhaValida){
        return res.status(401).send({mensagem:"Login não autorizado"})
    }

    const token= jwt.sign({nome: req.body.nome},SECRET)
    res.status(200).send({mensagem:"Login realizado com sucesso", token:token})

})
}

module.exports = {
  getAll,
  createTitle, 
  createLogin
}