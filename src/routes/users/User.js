const express = require("express");

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { User } = require('../../db');

const router = express.Router();


//divido bearer y token y me quedo con el token en la posicion 1 del arreglo q genere con el split
// Authorization: Bearer <token>
function verifyToken(req, res, next){
   const bearerHeader = req.headers['authorization']

   if(typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1]
      req.token = bearerToken;
      next();
   }else {
        res.sendStatus(403)
   }
}


router.post('/', (req, res, next) => {
    const {name, email, password, phoneNumberString, CoordinatorId} = req.body
    const phoneNumber = parseInt(phoneNumberString)
        const newUser = {
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            CoordinatorId: CoordinatorId,
            isAcepted: false
            }
            if(newUser.CoordinatorId !== null){
              User.create(newUser)
              .then((userWithIds) => {
                  jwt.sign({newUser}, 'secretkey', {expiresIn: 86400}, (err, token) => {
                      res.json({
                          userWithIds, token
                      })
                  })
              })
         
          .catch(err => next(err))
            }else {
              res.json('No ha podido crear la cuenta porque no ha asociado un coordinador.')
            }
})


router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.json("usuario eliminado correctamente"))
    .catch((err) => next(err));
});


router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
try {
  const usuario = await User.findOne({
    where: {
        email: email,
        password: password
    }
})
    
if(usuario){
  const user = {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    phoneNumber: usuario.phoneNumber,
    coordinatorId: usuario.CoordinatorId,
    role: usuario.role,
    isAcepted: usuario.isAcepted
}
const token = jwt.sign({id: usuario.id}, "group8", {
    expiresIn:86400
})

if(user.isAcepted === true || user.isAcepted === null){
  res.json({token, user});
}
if(user.isAcepted === false){
  res.json({notAcepted: 'El administrador aún no lo ha aceptado'})
}
}
        
      else{
          res.status(500).json({notExist: 'Cuenta inexistente'})
        }
}catch(err){
  next(err)
}
     
            
    
      
});

router.get("/:email/:password", (req, res, next) => {
  const { email, password } = req.params;
  User.findOne({
    where: {
      email: email,
      password: password,
    },
  })
    .then((usuario) => {
      const user = {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        password: usuario.password,
        phoneNumber: usuario.phoneNumber,
        coordinatorId: usuario.CoordinatorId,
        role: usuario.role,
        isAcepted: usuario.isAcepted
      };
      if(user.isAcepted === true || user.isAcepted === null){
        res.json(user);
      }else{
        res.json({message: 'El administrador aún no lo ha aceptado'})
      }
    })
    .catch((err) => next(err));
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const isAcepted = true;
 await User.update(
    {
      isAcepted
    },
    {
      where: {
        id: id
      }
    }
  )
  
  let userAcepted = await User.findByPk(id)
  res.json(userAcepted)

})

module.exports = router;
