const rdf = require('../rdf/rdf.js')


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


module.exports = {
    index_render,
    findData_render,
    rdf_render
}