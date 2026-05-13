const { search } = require("../routers/auth_router")

const renderErrorPage = (res, code, message) => {
    res.locals.metatitle = code
    res.status(code).render('error', {code, message})
}

const searchQuery = async (model, query) => {
    if (query.trim() !== "") {
        const searchPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") //security meassure apparently (removes injection-like keys)
        data = await model.find({
          $or: [
            { "title.object.nb": { $regex: searchPattern, $options: "i" } },
            { "title.object.en": { $regex: searchPattern, $options: "i" } },
          ],
        })
      } else {
        data = await model.find({})
      }
    return data
}

module.exports = {
    renderErrorPage,
    searchQuery
}