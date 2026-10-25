// Depois do build: põe o HTML da página dentro do <div id="root"> do
// dist/index.html. Sem isso o site chegava vazio (1,9 KB) e o Google só via
// o título e a descrição.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('dist-ssr/servidor.js')).href)
const arquivo = resolve('dist/index.html')
const html = readFileSync(arquivo, 'utf8')
const marca = '<div id="root"></div>'
if (!html.includes(marca)) throw new Error('index.html sem <div id="root"></div>')
writeFileSync(arquivo, html.replace(marca, `<div id="root">${render()}</div>`))
rmSync('dist-ssr', { recursive: true, force: true })
console.log('pré-montado:', arquivo)
