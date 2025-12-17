// * example of how function "getRDF()" works

const rdf = require('../rdf/rdf.js')

// example links 
const linklist = [
    "https://fellesdatakatalog.digdir.no/datasets/8c6507ff-ec80-3291-9720-97bdd89bd536",
    "https://fellesdatakatalog.digdir.no/datasets/4e52bab6-08f7-38a7-bb99-6f630ec273ee",
    "https://data.norge.no/nb/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab/overgang-til-arbeid-og-stonad?tab=rdf" // dummy link, fails to fetch any data
]

for (link of linklist)
{
    console.log()
    rdf.getRDF(link)
    .then(obj => {
        if (Object.values(obj).length) //remember to make sure the function actually fetches any data, incase of dummy links
        {
            console.log(obj.title.object[0])
            console.log(obj.description.object[0])
        }
        console.log()
        console.log()
        console.log()
    })
}




// * example of how printOutinfo works

const db = require('../handlers/mongoDbHandler')
const NavData = require('../models/main_model')


/*
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

const RDFobject = require('./getRDFobject')

db.connectToMongoDb()
.then(
    RDFobject.printOutInfo('Pensjonsrettigheter')
    .then((data)=>{
        //your logic here n shi
    })
)