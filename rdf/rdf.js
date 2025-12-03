const N3 = require('n3')

const getQuadRDF = async (url) =>
{
    const quadrdf = await fetch(url, {
        headers: { 'Accept': 'text/turtle' }
    })
        .then(res => {
            return res.text()
        })
        .then(turtle => {
            const parser = new N3.Parser();
            count = 0
            quadlist = []
            parser.parse(turtle, (error, quad, prefixes) => {
                count++
                if (quad != undefined) {
                    quadlist.push(quad)
                } 
            })
            return quadlist
        })
        .then(quadlist => 
        {   
            console.log("Fetch complete")
            return quadlist
        })
    return quadrdf
}

module.exports = {
    getQuadRDF
}