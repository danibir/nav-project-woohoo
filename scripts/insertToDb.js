const NavData = require('../models/main_model')
const db = require('../handlers/mongoDbHandler')
const rdf = require('../rdf/rdf')
const scrpt = require('./scripts/script.js')

const addToDb = async (url) => {
    await db.connectToMongoDb()
    const rdfData = await rdf.getRDF(url)
    const isOccupied = await NavData.exists({ link: url })
    console.log(rdfData.title.object)
    let titles = {}
    let title
    for (title of rdfData.title.object)
    {
        const titleob = scrpt.snipLang(title)
        titles[titleob[1]] = titleob[0]
    }
    console.log(`( ${rdfData.title.object} )`)
    if (!isOccupied)
    {
        console.log('Adding url...')
        const obj = {
            title: titles,
            url: url
        }
        let newObj = new NavData(obj)
        console.log(newObj)
        newObj.save()
    }
    else
    {
        console.log('Url already in database...')
    }
}

//example list

link_list = [
    "https://fellesdatakatalog.digdir.no/datasets/8c6507ff-ec80-3291-9720-97bdd89bd536",
    "https://fellesdatakatalog.digdir.no/datasets/4e52bab6-08f7-38a7-bb99-6f630ec273ee",
    "https://fellesdatakatalog.digdir.no/datasets/641c14e0-cfb6-3193-9b6f-9bf455be6b3e",
    "https://fellesdatakatalog.digdir.no/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab",
    "https://fellesdatakatalog.digdir.no/datasets/4122e5f2-c3c7-3ecf-afbc-c0299d7a8973",
    "https://fellesdatakatalog.digdir.no/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab",
    "https://fellesdatakatalog.digdir.no/datasets/42dc3fe7-46b6-3674-8301-60b6aab84ef5"
]

for (link of link_list)
{
    addToDb(link)
}
//*/

module.exports = {addToDb}