const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `Password provided to match the following rules:
                        <br>
                        1. It must contain only lower case, upper case, or numbers
                        <br>
                        2. It must be at least 8 characters and no more than 32`
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration'
                    })
            }
        } else {
            next()
        }
    }
}