const mongoose = require("mongoose")
 async function connectToMongoDb() {
    try{
        await mongoose.connect("mongodb://10.12.14.178:27017/", {dbName: "navData"});
        console.log("Connected to mondoDB on collection: ", mongoose.connection.name);

    }catch(err){
        console.log("Error on mongoDbHandler on path /handlers/mongoDbHandler.js. Error: ", err)
    }
}

module.exports = {connectToMongoDb}