const express = require("express")
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const DATA_PATH = './database.json';

const userRouter = express.Router();

// util functions
const saveDataToFile = (data) =>{
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(DATA_PATH, stringifyData)
}

const getUsersFromFile = () => {
    const jsonData = fs.readFileSync(DATA_PATH)
    return JSON.parse(jsonData)  
      
}

//Read
userRouter.get('/users', (req, res) => {
    const users = getUsersFromFile()
    res.send(users)
})

userRouter.post('/users/addUser', (req, res) => {
    if(!req.body.email || !req.body.login || !req.body.password){
        res.statusCode = 400;
        res.send({error: 'ValidationError'})
    }else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body,email))){
        res.statusCode = 400;
        res.send({error: 'Email is incorrect'})
    }
    else{
        let currentUsersList = getUsersFromFile();
        const newUser = {
            ...req.body(),
            id: uuidv4()
        }
        currentUsersList.push(newUser)
        saveDataToFile({users: currentUsersList})
        res.send({success: true, msg: 'account data added successfully', data: newUser})
    }

})




module.exports = userRouter;