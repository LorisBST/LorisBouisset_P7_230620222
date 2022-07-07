const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get ('/profile', userCtrl.findOneUser) // ne pas renvoyer le mot de passe
router.put ('/profile/update', userCtrl.updateUser) // nom/prenom/service

module.exports = router;