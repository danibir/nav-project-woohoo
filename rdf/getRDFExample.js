// * example of how function "getRDF()" works

const rdf = require('../rdf/rdf.js')

// example links 
const linklist = [
    "https://fellesdatakatalog.digdir.no/datasets/8c6507ff-ec80-3291-9720-97bdd89bd536"
]

for (link of linklist)
{
    console.log()
    rdf.getRDF(link)
    .then(obj => {

        console.log(obj)
        console.log()
        console.log()
        console.log()
    })
}




// * example of how printOutinfo works
/*
const db = require('../handlers/mongoDbHandler')
const NavData = require('../models/main_model')



db.connectToMongoDb()
.then(
    NavData.find()
    .then((data)=>{
        console.log(data)
        for (d of data)
        {
            rdf.getRDF(d.link).then((rdfdata)=>{
                console.log(rdfdata)
            })
        }
    })
)
//*/
/*
const RDFobject = require('./getRDFobject')

db.connectToMongoDb()
.then(
    RDFobject.printOutInfo('Pensjonsrettigheter')
    .then((data)=>{
        //your logic here n shi
    })
)

//*/