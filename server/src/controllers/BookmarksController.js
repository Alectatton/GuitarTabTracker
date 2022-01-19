const {Bookmark} = require('../models')
//const _ = require('lodash')
//const {Op} = require('sequelize')

module.exports = {
    async index (req, res) {
        try {
            const userId = req.query.userId
            const bookmark = await Bookmark.findAll({
                where: {
                    UserId: userId
                }})
              /*   include: [
                    {
                        model: Song
                    }
                ]
            }).map(bookmark => bookmark.toJSON())
                .map(bookmark => _.extend({
                    bookmarkId: bookmark.id
                }, bookmark.Song)) */
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the bookmarks'
            })
        }
    },
    async retrieve (req, res) {
        try {
            const userId = req.query.userId
            const songId = req.query.songId
            const bookmark = await Bookmark.findOne({
                where: {
                    UserId: userId,
                    SongId: songId,
                }
            })
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to find a matching bookmark'
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
            const bookmarkId = req.params.bookmarkId
            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId,
                }
            })
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete the bookmark'
            })
        }
    }
}