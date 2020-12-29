const fs = require('fs')
const cheerio = require('cheerio')
const markdownIt = require('markdown-it')
const md = new markdownIt()

function parse(page) {
    const $ = cheerio.load(fs.readFileSync('./src/layout.html'))
    const md_src = fs.readFileSync('./pages/' + page).toString()
    const markdown = md.render(md_src)
    $('body').append(markdown)

    $('p:contains("{{")').each(function(i, e) {
        const props = $(this).text().replace('{{', '').replace('}}', '').split(' ')
        const type = props.shift();
        $(this).replaceWith(`<${type} ${props.join(' ')}></${type}>`)
    })

    return $.html()
}

module.exports = {
    parse
}
