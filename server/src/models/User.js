const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user) {
    const SALT_FACTOR = 8
    console.log('hashPassword')

    if (!user.changed('password')) {
        return;
    }

    console.log('bcrypt')

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            //beforeCreate: hashPassword, {{ TODO - double hashing password and it doesn't work }}
            //beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        console.log(password)
        console.log(this.password)
        return bcrypt.compareAsync(password, this.password)
    }

    return User
} 