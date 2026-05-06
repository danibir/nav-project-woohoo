const Rdf = require('../models/main_model')
const rdf = require("../rdf/rdf")
const insert = require('../scripts/insertToDb')
const helper = require('../handlers/helperware')

const index_get = async (req, res) => {
    const rdf = await Rdf.find()
    console.log(rdf[0])
    res.render("adminMenu", { rdfdata: rdf })
}
const create_get = async (req, res) => {
    const data = await get_tags()
    res.render("adminCreate", { data })
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

const edit_get = async (req, res) => {
    const id = req.params.id.slice(1, req.params.id.length)
    console.log(id)
    try {
        const rdfItem = await Rdf.findById(id)
        console.log(rdfItem)
        if (!rdfItem) {
            console.log('not found')
            console.log(rdfItem)
            return helper.renderErrorPage(res, 404, 'Page not found')
        } else {
            console.log('found')
            const tags = await get_tags()
            const title = rdfItem.title.object.nb || "Kunne ikke få tittel"
            res.render("adminEdit", { title, rdfItem, tags, id })
        }
    } catch(err) {
        console.log(`datapage error: ${err}`)
        res.redirect("/rdf")
    }
}
const edit_post = async (req, res) => {
    const id = req.params.id.slice(1, req.params.id.length)
    const newtags = req.body['data-item']
    console.log(newtags)
    try {
        const rdfItem = await Rdf.findById(id)
        rdfItem.tags = newtags
        rdfItem.save()
        res.redirect('/admin')
    } catch(err) {
        console.log(`datapage error: ${err}`)
        res.redirect("/rdf")
    }
}
const delete_post = async (req, res) => {
    const id = req.params.id.slice(1, req.params.id.length)
    console.log(id)
    try {
        await Rdf.findByIdAndDelete(id)
        res.redirect('/admin')
    } catch (err) {
        console.log(`datapage error: ${err}`)
        res.redirect("/rdf")
    }
}

const get_tags = async () =>{
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

    return sortedUnique
}

module.exports = {
    index_get,
    create_get,
    create_post,
    edit_get,
    edit_post,
    delete_post
}