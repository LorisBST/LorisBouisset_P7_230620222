const express = require('express');
const router = express.Router();
const auth = require ("../middleware/auth")
// const multer = require ("../middleware/multer-config")
const userCtrl = require('../controllers/user');
const multer = require("multer")
const upload = multer()

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get ('/profile/:id', userCtrl.findOneUser) // ne pas renvoyer le mot de passe
router.put ('/profile/:id', auth, upload.array() , userCtrl.updateUser) // nom/prenom/service

module.exports = router;