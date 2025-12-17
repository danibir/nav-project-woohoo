const rdf = require('../rdf/rdf.js')
const navData = require("../models/main_model.js")


let object = {
    '22-rdf-syntax-ns#type': null,
  accessRights: null,
  description: null,
  publisher: null,
  title: null,
  'dcat#contactPoint': null,
  'dcat#theme': null,
  'ns#fn': null,
  'ns#hasEmail': null
}

let =  printOutInfo= async(info)=>
{
    const data = await navData.findOne({name: info})
    console.log(data)
    
        const rdfinfo = await rdf.getRDF(data.link)
        console.log(rdfinfo)
    for([key, value] of Object.entries(rdfinfo)){

        object[key] = rdfinfo[key].object
        
    }
    return object;
}

module.exports = {printOutInfo}