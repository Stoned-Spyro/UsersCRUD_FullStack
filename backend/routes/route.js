const express = require("express")
const fs = require('fs');
const userRouter = require('./users.js')

const router = express.Router();

router.use(userRouter)


module.exports = router;