const Comment = require('../models/comment')
// const fs = require('fs')

// Récuperer tous les commentaires
exports.getAllComments = (req, res, next) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: error }))
}

// Récuperer un commentaire
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ userId: req.params.id })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error: error }))
}


// Créer un commentaire
exports.createComment = (req, res, next) => {
    console.log(req.body)
    const comment = new Comment({userId : req.body.userId, message : req.body.message })
    console.log("2")
    comment.save()
        .then(() => res.status(201).json({ message: 'Comment saved!' }))
        .catch(error => res.status(400).json({ error }))
}

// update sauce
exports.updateComment = (req, res, next) => {
    const commentObject =  { ...req.body }
    Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Comment updated!' }))
        .catch(error => res.status(400).json({ error }))
}
//
// Delete Comment
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
                Comment.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Comment deleted !' }))
                    .catch(error => res.status(400).json({ error: error }))
            })
        .catch(error => res.status(500).json({ error }))
}

// exports.likeDislike = (req, res, next) => {
//     if (req.body.like === 1) {
//         Comment.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
//             .then((comment) => res.status(200).json({ message: 'Like added !' }))
//             .catch(error => res.status(400).json({ error }))
//     } else if (req.body.like === -1) {
//         Comment.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
//             .then((comment) => res.status(200).json({ message: 'Dislike added !' }))
//             .catch(error => res.status(400).json({ error }))
//     } else {
//         Comment.findOne({ _id: req.params.id })
//             .then(comment => {
//                 if (comment.usersLiked.includes(req.body.userId)) {
//                     Comment.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
//                         .then((comment) => { res.status(200).json({ message: 'Like deleted !' }) })
//                         .catch(error => res.status(400).json({ error }))
//                 } else if (comment.usersDisliked.includes(req.body.userId)) {
//                     Comment.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
//                         .then((comment) => { res.status(200).json({ message: 'Dislike deleted!' }) })
//                         .catch(error => res.status(400).json({ error }))
//                 }
//             })
//             .catch(error => res.status(400).json({ error }))
//     }
// }