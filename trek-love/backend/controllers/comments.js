/* 
-------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/comments`
------------------------------------------------------------- */


/* Require modules
---------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')


/* Routes
---------------------------------------------------------- */
// Index Route (GET/Read): Will display all comments
router.get('/:episodeId', function (req, res) {
    db.Comment.find({ episodeId: req.params.episodeId })
        .then(comments => res.json(comments))
})

// Create Route (POST/Create): This route receives a POST request and
// creates a new comment document using the request body
router.post('/', (req, res) => {
    db.Comment.create(req.body)
        .then(comment => res.json(comment))
})

// Update Route (PUT/Update): This route receives a PUT request and 
// edits the specified comment document using the request body
router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(comment => res.json(comment))
})

// Destroy Route (DELETE/Delete): This route deletes a comment document 
// using the URL parameter (which will always be the comment document's ID)
router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedCommentId: req.params.id }))
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router
