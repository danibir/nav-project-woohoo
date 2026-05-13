const mongoose = require("mongoose")

// * for the case of the database being down, write a key in the .env file called "localDB" with the value of 1
// >localDB = 1

async function connectToMongoDb() {
    let dbIP = "10.12.14.178"
    if (process.env.localDB && process.env.localDB == true) {
        dbIP = 'localhost'
    } 
    try {
        await connectHelper(dbIP)
    } catch (err) {
        throw Error(`error on connect to mongodb: ${err}`)
    }
}
async function connectHelper(dbIP = 'localhost', dbName = "navData") {
    const timeUntilTimeout = 10000
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Timeout: database didn't respond. (${timeUntilTimeout / 1000} seconds)`));
        }, timeUntilTimeout)
    })
    const connectPromise = mongoose.connect(`mongodb://${dbIP}:27017/`, { dbName })

    try {
        await Promise.race([connectPromise, timeoutPromise]);
        console.log("Connected to mondoDB on collection: ", mongoose.connection.name);

    }catch(err){
        throw new Error(`Error on mongoDbHandler on path /handlers/mongoDbHandler.js. Error: ${err}`)
    }
}

module.exports = {connectToMongoDb}