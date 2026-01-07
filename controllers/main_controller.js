const rdf = require('../rdf/rdf.js')
const rdfobj = require('../rdf/getRDFobject.js')
const db = require('../handlers/mongoDbHandler.js')
const Rdf = require('../models/main_model.js')


const index_render = (req,res)=>{
    res.render("index")
}

const findData_render = (req, res) => {
    res.render("findData");
}

const rdf_render = async (req,res)=>{
    const rdfinfo = await rdf.getRDF("https://fellesdatakatalog.digdir.no/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab")
    res.render("tempRDF", { rdf: rdfinfo })
}

const datapage_render = async (req, res) =>
{
    let subject = req.params.subject
    subject = subject.slice(1)
    console.log(subject)
    Rdf.findOne({ name: subject })
    .then(async(resu)=>{
        if (!resu)
        {
            res.redirect('/rdf')
        }
        else
        {
            const rdfdata = await rdf.getRDF(resu.link)
            console.log(rdfdata)
            res.render("data-page", { rdfdata })
        }
    })
    .catch((err)=>{
        console.log(`datapage error: ${err}`)
        res.redirect('/rdf')
    })
}

module.exports = {
    index_render,
    findData_render,
    rdf_render,
    datapage_render
}