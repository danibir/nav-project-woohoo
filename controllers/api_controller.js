
const Data = require('../models/main_model')
const RDF = require('../rdf/rdf')

const get_all = async (req, res) => {
    const data = await Data.find().lean()
    console.log(data)
    res.render('api-list', { title: "Main page", data })
}
const get_all_rdf = async (req, res) => {
    const data = await Data.find().lean()
    const rdfArray = []
    for( item of data ) {
        rdfArray.push(await RDF.getRDF(item.url))
    }
    console.log(rdfArray)
    res.render('api-list', { title: "Rdfs", data: rdfArray })
}


module.exports = {
    get_all,
    get_all_rdf
}