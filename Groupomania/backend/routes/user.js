const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get ('/profile/:id', userCtrl.findOneUser) // ne pas renvoyer le mot de passe
router.put ('/profile/:id/update', userCtrl.updateUser) // nom/prenom/service

module.exports = router;