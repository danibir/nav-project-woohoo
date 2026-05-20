const cron = require("node-cron")
const Data = require("../models/main_model")
const RDF = require('../rdf/rdf')

const refreshDB = async () => {
    try {
        const data = await Data.find()
        for (item of data) {
            const rdf = await RDF.getRDF(item.url)
            try {
                item.title = rdf.title
                item.description = rdf.description
                await item.save()
            } catch (err) {
                console.log(`assignment fail, removing instance from database (${item._id}) error: ${err}`)
                //await Data.findByIdAndDelete(item._id)
            }
        }
    } catch (err) {
        console.log(`update schedule fail, error: ${err}`)
    }
}

cron.schedule("0 3 * * *", async () => {
    await refreshDB()
})

module.exports = refreshDB