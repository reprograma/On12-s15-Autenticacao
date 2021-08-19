const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
<<<<<<< HEAD
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET
=======
const jwt=require('jsonwebtoken')
const SECRET=process.env.SECRET
const bcrypt = require('bcrypt')
//console.log(process.env);
>>>>>>> afef92b (criando camadas de segurança a API)


const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]
  // console.log(token)
<<<<<<< HEAD
=======
  
>>>>>>> afef92b (criando camadas de segurança a API)

  if (!token) {
    return res.status(403).send({message: "Kd a tokenzinnn"})
  }
  // usar método do jwt para autenticar a rota
    // verificação do token com o SECRET do projeto
  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: 'Token não válido', err})
    }

    const estudios = await Estudio.find()
    res.json(estudios)
  })
}


const createStudio = async (req, res) => {

  const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
  req.body.senha = senhaComHash

  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
    senha:req.body.senha
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

const createLogin=(req,res)=>{
  Estudio.findOne({ nome: req.body.nome}, (err, estudioEncontrada)=> {
    if(!estudioEncontrada){
        return res.status(404).send({message:'Estudio não encontrada', nome:`${req.body.nome}`})
    }

    const senhaValida= bcrypt.compareSync(req.body.senha, estudioEncontrada.senha)

    if(!senhaValida){
        return res.status(401).send({mensagem:"Login não autorizado"})
    }

    const token= jwt.sign({nome: req.body.nome},SECRET)
    res.status(200).send({mensagem:"Login realizado com sucesso", token:token})

})
}

module.exports = {
  getAll,
  createStudio,
  createLogin
}