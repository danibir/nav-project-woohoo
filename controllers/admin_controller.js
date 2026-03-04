const Rdf = require('../models/main_model')

const index_get = async (req, res) => {
    const rdf = await Rdf.find()
    console.log(rdf[0])
    res.render("adminMenu", { rdfdata: rdf })
}

module.exports = {
    index_get
}