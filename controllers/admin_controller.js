const Rdf = require('../models/main_model')
const rdf = require("../rdf/rdf")
const insert = require('../scripts/insertToDb')

const index_get = async (req, res) => {
    const rdf = await Rdf.find()
    console.log(rdf[0])
    res.render("adminMenu", { rdfdata: rdf })
}
const create_get = async (req, res) => {
    const rdf = await Rdf.find()
    const tagArray = []
    for (const item of rdf) {
        for (tag of item.tags) {
            tagArray.push(tag)
        }
    }
    const counts = {}
    for (const item of tagArray) {
    counts[item] = (counts[item] || 0) + 1
    }

    // Sort by count descending
    const sortedUnique = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([value]) => value)

    res.render("adminCreate", { data: sortedUnique })
}

const create_post = async (req, res) => {
    const data = await rdf.getRDF(req.body.url)
    if (!!data) {
        await insert.addToDb(req.body.url, req.body["data-item"])
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