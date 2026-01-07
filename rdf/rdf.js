const N3 = require('n3')



// pulls rdf data from rdf link into an object
const getRDF = async (url) => // * IMPORTANT | url parameter is the rdf url, not the webpage link
{

    
    //pull rdf from link (idfk how turtle works, just take it for granted and dont touch)
    
    const quadrdf = await fetch(url, {
        headers: { 'Accept': 'text/turtle' }
    })
        .then(res => {
            return res.text()
        })
        .then(turtle => {
            const parser = new N3.Parser();
            count = 0
            let quadlist = []
            let prefix = NaN
            parser.parse(turtle, (error, quad, prefixes) => {
                count++
                if (quad != undefined) {
                    quadlist.push(quad)
                } 
                if (prefixes != undefined){
                    //console.log(prefixes)
                }
            })
            return quadlist
        })
        .then(quadlist =>  // reporting fetch success
        {
            console.log("getRDF Fetch complete")
            return quadlist
        })

    if (quadrdf.length == 0 || quadrdf == undefined)
        console.log(`getRDF Warning: couldn't get any rdf data from url (${url}).`)

    // place rdf data into object
    let obj = {}
    for (qu of quadrdf)
    {
        let q_subje = qu._subject.id
        let q_predi = qu._predicate.id
        let q_objec = qu._object.id
        
        // get predicate name from link (unreliable?)
        const index = q_predi.lastIndexOf('/')
        const prediItem = q_predi.substring(index + 1, q_predi.length)

        //set subject and object
        if (!obj[prediItem]) // if new predicate (add key, set object)
        {
            obj[prediItem] = { object: [], subject: "" }
            obj[prediItem].object = [q_objec]
        }
        else // if existing predicate (append object)
            obj[prediItem].object.push(q_objec)
        obj[prediItem].subject = q_subje //set subject afterwards
    }
    return obj
}

module.exports = {
    getRDF
}