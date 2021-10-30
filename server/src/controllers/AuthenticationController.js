module.exports = {
    register (req, res) {
        res.send({
            message: `Your user was registered: ${req.body.email}`
        })
    }
}