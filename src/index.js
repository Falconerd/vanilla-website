const fs = require('fs')
const { parse } = require('./parse.js')

fs.rmdirSync('dist', { recursive: true }, (err) => {
    if (err) {
        console.error(err)
        return err.code
    }
})

fs.mkdirSync('dist')
try {
    fs.mkdirSync('scripts')
} catch (e) {
    if (e.code !== 'EEXIST') {
        console.error(e)
        return e.errno
    }
}

// Get each file in pages and parse them into html files.
const pages = fs.readdirSync('pages')

for (let page of pages) {
    if (!page.includes('.md')) continue
    const parsed = parse(page)
    const name = page.split('.md')[0]

    fs.writeFileSync(`dist/${name}.html`, parsed)
    console.log(`compiled pages/${name}.md -> dist/${name}.html`)
}

// Copy js files into dist.
const scripts = fs.readdirSync('scripts')

for (let script of scripts) {
    if (!script.includes('.js')) continue
    console.log(script)
    fs.copyFileSync(`scripts/${script}`, `dist/${script}`)
}
