const setLocals = (req, res, next) => {
    res.locals.navItems = []
    next()
}

const addNavItems = (navitems) => (req, res, next) => {
    res.locals.navItems = res.locals.navItems.concat(navitems)
    next()
}


module.exports = {
    setLocals,
    addNavItems
}