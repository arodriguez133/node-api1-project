// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());

server.get('/api/users', (req, res)=> {
    User.find()
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err)=>{
        res.status(500).json({
            message: "error getting users",
            err: err.message,
        })
    })
});

server.get('/api/users/:id', (req, res)=> {
    User.findById(req.params.id)
    .then((user)=>{
      if(!user){
          res.status(404).json({
              message: "The user with the specified ID does not exist",
          })
      }
      res.json(user);
    })
    .catch((err)=>{
        res.status(500).json({
            message: "error getting user",
            err: err.message,
        })
    })
})

server.post('/api/users', (req,res)=>{
    const user = req.body;
    if(!user.name|| !user.bio){
        res.status(400).json({
            message: "Please provide name and bio for user"
        })
    }else{
        User.insert(user)
        .then((newUser) => {
            res.status(201).json(newUser)
        })
        .catch((err)=> {
            res.status(500).json({
                message: 'error creating user',
                err: err.message, 
                stack: err.stack,
            })
        })
    }
})

server.delete('/api/users/:id', async (req, res)=> {
    const {id} = req.params
    const possibleUser = await User.findById(id);
    if(!possibleUser){
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }else{
        const deletedUser = await User.remove(id);
        res.status(200).json(deletedUser)
    }
})

server.put('/api/users/:id', async (req,res)=> {
    const {id} = req.params
    const {name, bio} = req.body;
 try{
    const possibleUser =  await User.findById(id);
    if(!possibleUser){
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    }else{
        if(!name || !bio){
            res.status(400).json({
                message: "Please provide name and bio for user",
            })
        }else{
           const updatedUser = await User.update(
               req.params.id, 
               req.body
        );
           res.status(200).json(updatedUser);
        }
    } 
 }
 catch(error){
     res.status(500).json({
         message: "Error updating user",
         error: error.message,
         stack: error.stack,
     })
 }
})

server.use('*', (req, res)=> {
    res.status(404).json({message: "not found"});
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
