const { getCipherInfo } = require('crypto')
const express = require('express')
const { loginUser,signupUser,getViews } = require('../controllers/UserController')
const router = express.Router()


//get
router.get('/', getViews)

// login 
router.post('/login', loginUser)

// signup
router.post('/signup', signupUser)


module.exports = router
