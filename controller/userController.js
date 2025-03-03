import express from 'express'
import { usersModel } from '../models/usersModel.js'


export const userController = express.Router()


//Route to list(Read)
userController.get('/users', async(req,res)=>{
//res.send('get list')
   try {
       const data = await usersModel.findAll({
        attributes:['id', 'firstname', 'lastname', 'email', 'password']
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get users list: ${error}`)
 }
})

userController.get('/users/:id([0-9]*)', async(req,res)=>{
    try {
       const { id } = req.params
       const data = await usersModel.findOne({ where: { id: id },
       })
       if (!data) {
           return res.status(404).json({ message: `User with id #${id} not found` });
       }
       return res.json(data);
   } catch (error) {
       console.error(`Could not get user details: ${error}`)        
   }
 })

// Route to create (CREATE)
userController.post('/users', async (req, res) => {
    const { firstname, lastname,email, password, refresh_token, is_active} = req.body;
    
    if(  !firstname || !lastname || !email || !password || !refresh_token || !is_active ) {
        return res.json({ message: 'Missing required data' })
    }
    try {
        const result = await usersModel.create({
            firstname, lastname,email, password, refresh_token, is_active})
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create user: ${error.message}`})
    }
 })

 //Route til update
 userController.put('/users', async(req, res)=>{
    //console.log('Ready to update');
    const { id, firstname, lastname, email, password, is_active, refresh_token} = req.body;
   
    if(!id || !firstname || !lastname || !email || !password || !is_active || !refresh_token )  {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await usersModel.update({
           id, firstname, lastname, email, password, is_active, refresh_token
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update user: ${error.message}`})
    }
 })

 //Route til delete
 userController.delete('/users/:id([0-9]*)', async(req, res)=>{
    // Henter ID fra URL-parametrene
  const { id } = req.params;
  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette bilen fra databasen baseret på ID
      await usersModel.destroy({
        where: { id }
      });
      // Returnerer succesbesked
      res.status(200).send({
        message: `Item is deleted`
      });
    } catch (error) {
      // Send en HTTP-statuskode 500 hvis der opstår en fejl
      res.status(500).send({
        message: `Could not delete: ${error.message}`
      });
    }
  } else {
    // Sender 400 Bad Request-fejl hvis ID er ugyldigt 
    res.status(400).send({
      message: "Id is not valid"
    });
  }
});
 
    
