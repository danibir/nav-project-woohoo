
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
    res.locals.navItems = res.locals.navItems.concat(navitems)
    next()
}


module.exports = {
    setLocals,
    addNavItems
}