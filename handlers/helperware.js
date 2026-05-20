const renderErrorPage = (res, code, message) => {
    res.locals.metatitle = code
    res.status(code).render('error', {code, message})
}

const searchQuery = async (model, query) => {
    if (query.trim() !== "") {
        const searchPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") //security meassure apparently (removes injection-like keys)
        data = await model.find({ "title.object.nb": { $regex: searchPattern, $options: "i" } }).lean()
      } else {
        data = await model.find({}).lean()
      }
    return data
}

const trimRdfdata = (data) => {
    const modifykeys = (data, key, func) => {
        if (!data[key])
            return data
        for (var i = 0; i < (data[key].object).length; i++) {
            data[key].object[i] = func (data[key].object[i])
        }
        return data
    }

    data = modifykeys(data, "issued", (elm) => {
        return elm.slice(9, 11) + "-" + elm.slice(6, 8) + "-" + elm.slice(1, 5)
    })
    data = modifykeys(data, "modified", (elm) => {
        return elm.slice(9, 11) + "-" + elm.slice(6, 8) + "-" + elm.slice(1, 5)
    })
    data = modifykeys(data, "hasEmail", (elm) => {
        return elm.slice(7, elm.length)
    })
    
    return data
}

module.exports = {
    renderErrorPage,
    searchQuery,
    trimRdfdata
}