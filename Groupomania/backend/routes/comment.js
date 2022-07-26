const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config')
const commentCtrl = require('../controllers/comment')



router.get('/', auth,  commentCtrl.getAllComments)
router.get('/:id', auth, commentCtrl.getOneComment)
router.post('/', auth, commentCtrl.createComment)
router.put('/:id', auth, commentCtrl.updateComment)
router.delete('/:id', auth, commentCtrl.deleteComment)
// router.post('/:id/like', auth, commentCtrl.likeDislike)

module.exports = router