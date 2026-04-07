const renderErrorPage = (res, code, message) => {
    res.status(code).render('error', {code, message})
}

module.exports = {
    renderErrorPage
}