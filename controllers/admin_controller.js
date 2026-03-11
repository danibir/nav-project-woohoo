const Rdf = require('../models/main_model')
const rdf = require("../rdf/rdf")
const insert = require('../scripts/insertToDb')

const index_get = async (req, res) => {
    const rdf = await Rdf.find()
    console.log(rdf[0])
    res.render("adminMenu", { rdfdata: rdf })
}
const create_get = async (req, res) => {
    res.render("adminCreate", {})
}

const create_post = async (req, res) => {
    const data = await rdf.getRDF(req.body.url)
    if (!!data) {
        await insert.addToDb(req.body.url)
        res.redirect('/admin') 
    } else {
        res.json('url invalid')
    }

}

module.exports = {
    index_get,
    create_get,
    create_post
}