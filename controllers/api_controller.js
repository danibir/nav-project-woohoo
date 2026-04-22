
const Data = require('../models/main_model')
const RDF = require('../rdf/rdf')

const get_all = async (req, res) => {
    if (!req.isDBConnected) {
        return res.write('Database not available')
    }
    const query = req.query.search || ""
    let data = []

    if (query == "" || query.trim()) {
        const searchPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        data = await Data.find({
        $or: [
            { "title.object.nb": { $regex: searchPattern, $options: "i" } },
            { "title.object.en": { $regex: searchPattern, $options: "i" } },
        ],
    }).lean()
    } else {
        data = await Rdf.find({}).lean()
    }
    res.render('api-list', { title: "Main page", data })
}
const get_all_rdf = async (req, res) => {
    if (!req.isDBConnected) {
        return res.write('Database not available')
    }
    const query = req.query.search || ""
    let data = []

    if (query == "" || query.trim()) {
        const searchPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        data = await Data.find({
        $or: [
            { "title.object.nb": { $regex: searchPattern, $options: "i" } },
            { "title.object.en": { $regex: searchPattern, $options: "i" } },
        ],
    }).lean()
    } else {
        data = await Rdf.find({}).lean()
    }
    const rdfArray = []
    for( item of data ) {
        rdfArray.push(await RDF.getRDF(item.url))
    }
    res.render('api-list', { title: "Rdfs", data: rdfArray })
}



module.exports = {
    get_all,
    get_all_rdf
}