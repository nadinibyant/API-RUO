const server = {}
const users = require('./users')
const therapy = require('./therapy')
const chatTerry = require('./chatTerry')
const profile = require('./profile')
const message = require('./message')

server.users = users
server.therapy = therapy
server.chatTerry = chatTerry
server.profile = profile
server.message = message

module.exports = server