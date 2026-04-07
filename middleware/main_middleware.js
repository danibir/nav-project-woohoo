const han = require('../handlers/helperware')

//sets local values for future functions
// - feel free to add more variables
const setLocals = (req, res, next) => {
    res.locals.navItems = []
    next()
}

//adds a item to the navbar
// - (in simpler terms, its just a list accessible by the ejs. here it adds item(s))
// - add "if (navItems.includes('yourItemString'))" to check this list 
const addNavItems = (navitems) => (req, res, next) => { //navitems parameter can be either an array or a single string, thanks to .concat
    res.locals.navItems = res.locals.navItems || []
    res.locals.navItems = res.locals.navItems.concat(navitems)
    next()
}

//sets status for database into req, so controller knows weither its connected or not
// - true or false please
const dbSetStatus = (status) => (req, res, next) => {
    req.isDBConnected = status
    res.locals.dbFail = !status
    if (!status) {
        res.clearCookie('admin')
    }
    next()
}

const dbReject503 = (req, res, next) => {
    if (!req.isDBConnected){
        return han.renderErrorPage(res, 503, "Service unavailable: database is unavailable, come back later.")
    }
    next()
}


module.exports = {
    setLocals,
    addNavItems,
    dbSetStatus,
    dbReject503
}