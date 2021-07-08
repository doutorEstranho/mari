const f = require("firebase")
f.initializeApp(process.env)
module.exports = f.default.database()