const express = require('express')
const multer = require('multer')
const router = express.Router()
const CRM_Controller = require('../Controllers/controller.cjs')
const init = require('../Middleware/init.cjs')

const upload = multer({storage:multer.memoryStorage()})

router.get('/',init,(req,res)=>{
    console.log('Initial Setup Done!')
})

router.get('/getEmployee',init,CRM_Controller.getEmployee)
router.post('/addEmployee',init,upload.single('file'),CRM_Controller.addEmployee)
router.post('/deleteEmployee',init,CRM_Controller.deleteEmployee)
router.post('/editEmployee',init,upload.single('file'),CRM_Controller.editEmployee)
router.post('/login',init,CRM_Controller.login)
router.post('/signup',init,CRM_Controller.signup)
router.get('/getAdmin',init,CRM_Controller.getAdmin)
router.post('/google-login',init,CRM_Controller.google_login)
router.post('/logUser',init,CRM_Controller.logUser)
router.get('/getLogs',init,CRM_Controller.getLogs)
router.post('/verifyOTP',init,CRM_Controller.verifyOTP)
router.post('/forgot',init,CRM_Controller.forgot)

module.exports = router