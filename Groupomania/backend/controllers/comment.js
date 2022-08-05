const Comment = require('../models/comment')
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')

// Récuperer tous les commentaires
exports.getAllComments = (req, res, next) => {
  Comment.find().populate("user", "fullname profilePicture service")
    .sort({ createdAt: -1 })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error: error }))
}

// Récuperer un commentaire
exports.getOneComment = (req, res, next) => {
  Comment.findOne({ userId: req.params.id }).populate("user")
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error: error }))
}


// Créer un commentaire
exports.createComment = (req, res, next) => {
  const comment = new Comment({ user: req.body.userId, message: req.body.message, image: req.body.image })
  comment.save()
    .then(cmt => {
      Comment.findOne({ _id: cmt._doc._id }).populate("user", "fullname profilePicture service")
        .then(comment => res.status(201).json({ ...comment._doc }))
    })
    .catch(error => res.status(400).json({ error }))
}

// update comment
exports.updateComment = (req, res, next) => {
  const commentObject = { ...req.body }
  Comment.findOne({ _id: req.params.id }).populate("user", "email")
    .then(Comment => {
      if (Comment.user._id.toString() === req.auth.userId) {
        Comment.updateOne({ ...commentObject })
          .then(() => res.status(200).json({ message: 'Comment updated!' }))
      } else if (req.user?.admin === true) {
        Comment.updateOne({ ...commentObject })
          .then(() => {
            res.status(200).json({ message: 'Comment Updated !' })
          })
      } else {
        res.status(403).json({ message: 'Forbidden' })
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => {
      res.status(500).json({ error, message: "Something went wrong..." })
    })
}

// delete comment
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id }).populate("user", "email")
    .then(Comment => {
      if (Comment.user._id.toString() === req.auth.userId) {
        Comment.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Comment Deleted !' })
          })
      } else if (req.user?.admin === true) {
        Comment.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Comment Deleted !' })
          })
      } else {
        res.status(403).json({ message: 'Forbidden' })
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => {
      res.status(500).json({ error, message: "Something went wrong..." })
    })
}


// Gestion des likes / Unlike
exports.like = (req, res, next) => {
  if (req.body.like === 1) {
    Comment.findOne({ _id: req.params.id })
      .then(comment => {
        if (!comment.usersLiked.includes(req.body.userId)) {
          Comment.updateOne({ _id: req.params.id }, {
            $push: { usersLiked: req.body.userId }
          })
            .then((comment) => res.status(200).json({ message: 'Like added !' }))
            .catch(error => res.status(400).json({ error }))
        }
      })
  } else {
    Comment.findOne({ _id: req.params.id })
      .then(comment => {
        if (comment.usersLiked.includes(req.body.userId)) {
          Comment.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId } })
            .then((comment) => {
              res.status(200).json({ message: 'Like deleted !' })
            })
            .catch(error => res.status(400).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }))
  }
}