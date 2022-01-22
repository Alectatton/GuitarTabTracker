const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    app.post('/songs', 
        SongsController.post)

    app.get('/songs',
        SongsController.index)
    app.get('/songs/:songId',
        SongsController.show)
    app.put('/songs/:songId', 
        SongsController.put)

    app.get('/bookmarks',
        isAuthenticated,
        BookmarksController.index)
    app.get('/bookmark',
        isAuthenticated,
        BookmarksController.retrieve)
    app.post('/bookmarks',
        isAuthenticated,
        BookmarksController.post)
    app.delete('/bookmark/:bookmarkId',
        isAuthenticated,
        BookmarksController.delete)
}