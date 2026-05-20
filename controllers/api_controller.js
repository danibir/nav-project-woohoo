
const Data = require('../models/main_model')
const RDF = require('../rdf/rdf')
const helper = require('../handlers/helperware')

const get_all = async (req, res) => {
    if (!req.isDBConnected) {
        return res.write('Kunne ikke finne database')
    }
    const query = req.query.search || ""
    data = await helper.searchQuery(Data, query)
    res.render('api-list', { title: "Main page", data, place: "" })
}
const get_all_rdf = async (req, res) => {
    if (!req.isDBConnected) {
        return res.write('Database not available')
    }
    const query = req.query.search || ""
    const data = await helper.searchQuery(Data, query)
    const rdfArray = []
    for( item of data ) {
        rdfArray.push(await RDF.getRDF(item.url))
    }
    res.render('api-list', { title: "Rdfs", data: rdfArray, place: "rdf" })
}



module.exports = {
    get_all,
    get_all_rdf
}