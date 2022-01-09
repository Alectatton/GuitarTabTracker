const {Bookmark} = require('../models')
//const {Op} = require('sequelize')

module.exports = {
    async index (req, res) {
        try {
            const userId = req.query.userId
            const bookmark = await Bookmark.findAll({
                where: {
                    UserId: userId
                }
            })
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the bookmarks'
            })
        }
    },
    async post (req, res) {
        try {
            const {songId, userId} = req.body
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            if (bookmark) {
                return res.status(400).send({
                    error: 'you already have this bookmarked'
                })
            }
            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the bookmark'
            })
        }
    },
    async delete (req, res) {
        try {
            console.log('here')
            const {bookmarkId} = req.params
            const bookmark = await Bookmark.findById(bookmarkId)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete the bookmark'
            })
        }
    }
}