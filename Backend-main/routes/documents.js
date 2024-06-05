const router = require('express').Router()
const {uploadDoc,getAll,getDoc,deleteDoc,updateDoc} = require('../controllers/document')
const upload = require('../middlewares/multer')
const {authPass} = require('../controllers/auth')

router.post('/upload',upload.single('file'),authPass, uploadDoc)

router.get('/getAllDocs',authPass, getAll)

router.get('/getDoc/:id',authPass, getDoc)

router.post('/deleteDoc/:id',authPass, deleteDoc)

router.put('/updateDoc/:id',authPass, updateDoc)

module.exports = router