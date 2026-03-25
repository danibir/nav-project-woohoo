const mongoose = require("mongoose")

// * for the case of the database being down, write a key in the .env file called "localDB" with the value of 1
// >localDB = 1

async function connectToMongoDb() {
    if (process.env.localDB && process.env.localDB == true) {
        connectHelper()
    } else {
        connectHelper('10.12.14.178')
    }
    
}
async function connectHelper(dbIP = 'localhost', dbName = "navData") {
    try{
        await mongoose.connect(`mongodb://${dbIP}:27017/`, {dbName});
        console.log("Connected to mondoDB on collection: ", mongoose.connection.name);

    }catch(err){
        console.log("Error on mongoDbHandler on path /handlers/mongoDbHandler.js. Error: ", err)
    }
}

module.exports = {connectToMongoDb}