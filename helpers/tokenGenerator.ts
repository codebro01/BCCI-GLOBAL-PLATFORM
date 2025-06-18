const {nanoid} = require('nanoid');

function generateToken (length: number = 32 ) {
    return nanoid(length)
}

module.exports = {generateToken};