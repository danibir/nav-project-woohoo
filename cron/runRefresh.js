const refresh = require('./updateRdfDb')
const db = require('../handlers/mongoDbHandler')
db.connectToMongoDb()
.then(()=> {
    refresh()
})
.catch((err)=> {
    console.log(`refresh error: ${error}`)
})