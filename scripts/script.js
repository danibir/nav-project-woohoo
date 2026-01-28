const snipLang = (text) =>
{
    const lang = text.substring(text.length - 2, text.length)
    const newtext = text.substring(1, text.length - 4)
    let textobj = [newtext, lang]
    return textobj
}
module.exports = {
    snipLang
}