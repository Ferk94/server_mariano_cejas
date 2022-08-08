const {Op} = require('sequelize')
const express = require("express");
const { Coordinator, Enterprise } = require('../../db');
const router = express.Router();



// endpoint localhost: http://localhost:3001/coordinators/'
// endpoint hosting: 


router.get("/", (req, res, next) => {

    const {name} = req.query

    if(name){

        Coordinator.findAll({
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }
            }
        })
        .then(response => {
            
            const filteredCoordinators = response.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    dropbox: e.dropbox
                }
            })
            return res.json(filteredCoordinators);                        
        })
        .catch(err => next(err))
        

    }
    else{

        Coordinator.findAll()
        .then(response => {
            const coordinators = response.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    dropboxCel: e.dropboxCel,
                    dropboxPc: e.dropboxPc,
                    EnterpriseId: e.EnterpriseId
                }
            })
            res.json(coordinators)
        })
        .catch(err => next(err))
    }
})

//Ruta para traer un Coordinador en particular por id
router.get('/:id', (req,res,next) => {

    const {id} = req.params;

    Coordinator.findOne({
        where:{
            id:id
        }
    })
    .then(response => {
        const coordinator = {
            id:response.id,
            name:response.name,
            dropboxCel: e.dropboxCel,
            dropboxPc: e.dropboxPc,
            EnterpriseId:response.EnterpriseId
        }
        res.json(coordinator);
    })
    .catch(err => next(err))

})


router.post("/:EnterpriseId", (req,res,next) => {
    
    const { name, dropboxCel, dropboxPc } = req.body;
    const { EnterpriseId } = req.params 

    Coordinator.create({name, dropboxCel, dropboxPc})
    .then(responseWithBracelet => {
        return responseWithBracelet.setEnterprise(EnterpriseId)
    })
    .then(respuesta => res.json(respuesta))
    .catch(err => next(err))
})


router.delete('/:id', (req,res,next) => {
    const {id} = req.params

 
    Coordinator.destroy({
        where:{
            id:id
        }
    })
    .then(response => {
        res.json('Coordinador eliminado exitosamente')
    })
    .catch(err => next(err))



})


router.put('/:id', (req,res,next) => {
    const {id} = req.params;

    Coordinator.update(req.body,{
        where:{
            id:id
        
        }
    })
    .then(response => {
        
        res.json('Los datos del Coordinador fueron actualizados correctamente');
   })
   .catch(err => next(err))
   
  })




  router.get('/byEnterpriseId/:EnterpriseId', (req, res, next) => {
      const { EnterpriseId } = req.params;


      Coordinator.findAll({
          where: {
              EnterpriseId: EnterpriseId
          }
      })
      .then(response => {
          res.json(response)
      })
      .catch(err => next(err))
  })




module.exports = router;