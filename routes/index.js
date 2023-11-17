const server = {}
const users = require('./users')
const therapy = require('./therapy')

server.users = users
server.therapy = therapy

module.exports = server