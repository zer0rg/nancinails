import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

// QA tooling is optional and isolated from the site's production dependencies.
const moduleName = process.env.PLAYWRIGHT_MODULE
const { chromium } = await import(moduleName
  ? pathToFileURL(resolve(moduleName)).href
  : 'playwright')
const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
}

export async function withBrowser(check) {
  const root = resolve(process.env.SITE_DIR ?? 'dist')
  const server = createServer(async (request, response) => {
    try {
      let file = resolve(root, `.${decodeURIComponent(new URL(request.url, 'http://local').pathname)}`)
      if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error('Invalid path')
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
      response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream')
      response.end(await readFile(file))
    } catch {
      response.writeHead(404).end('Not found')
    }
  })
  await new Promise((accept, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', accept)
  })
  let browser
  try {
    browser = await chromium.launch({ headless: true })
    await check({ browser, url: `http://127.0.0.1:${server.address().port}` })
  } finally {
    await browser?.close()
    await new Promise((done) => server.close(done))
  }
}
