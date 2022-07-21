const express = require('express')
const router = express.Router()
// const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config')
const commentCtrl = require('../controllers/comment')

router.get('/',  commentCtrl.getAllComments)
router.get('/:id', commentCtrl.getOneComment)
router.post('/',  commentCtrl.createComment)
// router.put('/:id', auth, multer, commentCtrl.updateSauce)
// router.delete('/:id', auth, commentCtrl.deleteSauce)
// router.post('/:id/like', auth, commentCtrl.likeDislike)

module.exports = router