const express = require("express")
const fileUtils = require('../utils/fileUtils')
const userRouter = express.Router();

//Get all users
userRouter.get('/users', (req, res) => {
    const users = fileUtils.getUsersFromFile();
    res.send(users);
})

//Get specific user
userRouter.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const currentUsersList = fileUtils.getUsersFromFile();
    const foundUser = currentUsersList.find((user) => user.id === Number(id))
    if(!foundUser){
        res.statusCode = 404;
        return res.send({error: `User with id: ${id} not found`})
    }
    res.send(foundUser);
})

//Create
userRouter.post('/users/addUser', (req, res) => {
    if(!req.body.email || !req.body.login){
        res.statusCode = 400;
        res.send({error: 'ValidationError: Missed required field'});
    }else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))){
        res.statusCode = 400;
        res.send({error: 'ValidationError: Email is incorrect'});
    }
    else{
        let currentUsersList = fileUtils.getUsersFromFile();
        const newId = currentUsersList.length > 0 ? currentUsersList[currentUsersList.length - 1].id + 1 : 1
        const newUser = {
            id: newId,
            login: req.body.login,
            first_name: req.body.first_name ?? "",
            last_name: req.body.last_name ?? "",
            email: req.body.email
        }
        if(currentUsersList.some((user)=>user.email === newUser.email || user.login === newUser.login)){
            res.statusCode = 400
            return res.send({error: "ValidationError: User with such email or login already exist"});
        } 
        currentUsersList.push(newUser);
        fileUtils.saveDataToFile({users: currentUsersList});
        res.statusCode = 201;
        res.send({success: true, msg: `New user with login ${newUser.login} has been created!`, data: newUser});
    }
})

//Update - with PUT method, because of task requirements
userRouter.put('/users/updateUser/:id', (req, res) => {
    if(!req.body.email || !req.body.login){
        res.statusCode = 400;
        res.send({error: 'ValidationError: Missed required field'});
    }else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))){
        res.statusCode = 400;
        res.send({error: 'ValidationError: Email is incorrect'});
    }else{
        let currentUsersList = fileUtils.getUsersFromFile();
        const { id } = req.params;
        const updateUserIndex = currentUsersList.findIndex((user) => user.id === Number(id));
        if(updateUserIndex === -1){
            res.statusCode = 404;
            return res.send({error: `User with id: ${id} not found`})
        }
        const updatedUserData = {
            id: Number(id),
            login: req.body.login,
            first_name: req.body.first_name ?? "",
            last_name: req.body.last_name ?? "",
            email: req.body.email
        }
        currentUsersList[updateUserIndex] = updatedUserData;
        fileUtils.saveDataToFile({users: currentUsersList});
        res.send({success: true, msg: `User with id: ${id} was successfully updated`, data: updatedUserData})
    }
 });

 //Delete
 userRouter.delete('/users/deleteUser/:id', (req, res) => {
    const currentUsersList = fileUtils.getUsersFromFile();
    const { id } = req.params;
    const newUsersList = currentUsersList.filter((user) => user.id !== Number(id))
    if(newUsersList.length === currentUsersList.length){
        res.statusCode = 404;
        return res.send({error: `User with id: ${id} not found`})
    }
    console.log(newUsersList);
    fileUtils.saveDataToFile({users: newUsersList});
    res.statusCode = 204;
    res.send();
 })


module.exports = userRouter;