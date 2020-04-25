const redis = require('redis')
const client = redis.createClient(6379)

module.exports = client