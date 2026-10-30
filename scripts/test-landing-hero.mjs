import assert from 'node:assert/strict'
import test from 'node:test'
import { withBrowser } from './browser-test-support.mjs'

const photoAlt = 'Uñas almendradas en negro con efecto carey y una flor difuminada, sobre adelfas rosas'
const decorations = '.bandada, .calabaza-flotante, .halloween-escena, .hero-campana, .hero-calabaza, .hero-arana'

for (const width of [360, 390, 768, 1440]) {
  test(`Hero and first-visit controls at ${width}px`, async (t) => {
    await withBrowser(async ({ browser, url }) => {
      const page = await browser.newPage({
        viewport: { width, height: width < 768 ? 844 : 1024 },
        reducedMotion: 'reduce',
      })
      await page.goto(url)
      await page.evaluate(() => document.fonts.ready)
      const hero = page.locator('.hero')

      await t.test('Names the services and location with one booking action', async () => {
        assert.equal((await hero.locator('h1').innerText()).replace(/\s+/g, ' ').trim(),
          'Manicura y pedicura en Rivas')
        assert.equal(await hero.locator('.claim').innerText(),
          'En Nanci Nails, Centro Comercial Santa Mónica.')
        const links = hero.getByRole('link')
        assert.equal(await links.count(), 1)
        assert.equal((await links.textContent()).trim(), 'Reservar por WhatsApp')
        assert.equal(await hero.getByRole('link', { name: /^Reservar por WhatsApp$/i }).count(), 1)
        const booking = new URL(await links.getAttribute('href'))
        assert.equal(booking.origin + booking.pathname, 'https://wa.me/34648760840')
        const seasonal = await page.locator('html').getAttribute('data-tema') === 'halloween'
        assert.equal(booking.searchParams.get('text'), seasonal
          ? 'Hola Nanci, me gustaría pedir cita para una manicura para Halloween.'
          : 'Hola Nanci, me gustaría pedir cita.')
      })

      await t.test('Keeps the title to two lines without horizontal overflow', async () => {
        const metrics = await hero.locator('h1').evaluate((heading) => {
          const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT)
          const rects = []
          while (walker.nextNode()) {
            if (!walker.currentNode.textContent.trim()) continue
            const range = document.createRange()
            range.selectNodeContents(walker.currentNode)
            rects.push(...[...range.getClientRects()].filter((rect) => rect.width > 0))
          }
          return {
            lines: new Set(rects.map((rect) => Math.round(rect.top))).size,
            right: Math.max(...rects.map((rect) => rect.right)),
            left: Math.min(...rects.map((rect) => rect.left)),
            pageWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
          }
        })
        assert.ok(metrics.lines <= 2, JSON.stringify(metrics))
        assert.ok(metrics.left >= 0 && metrics.right <= width, JSON.stringify(metrics))
        assert.equal(metrics.scrollWidth, metrics.pageWidth)
        assert.match(await hero.locator('h1').evaluate((heading) =>
          getComputedStyle(heading).fontFamily), /Bodoni Moda/)
        assert.match(await page.locator('body').evaluate((body) =>
          getComputedStyle(body).fontFamily), /Jost/)
      })

      await t.test('Shows real work with seasonal content confined to the photograph', async () => {
        const image = hero.locator('.imagen > img')
        assert.equal(await image.getAttribute('alt'), photoAlt)
        assert.match(await image.getAttribute('src'), /\/hero\.[^/]+$/)
        assert.ok(await image.evaluate((img) => img.complete && img.naturalWidth > 0))
        const media = hero.locator('.imagen')
        assert.equal(await media.evaluate((element) => getComputedStyle(element).overflow), 'hidden')
        const outside = await page.locator(decorations).evaluateAll((elements) =>
          elements.filter((element) => !element.closest('.hero .imagen')).length)
        assert.equal(outside, 0, 'Seasonal decorations must not escape hero media')
        const mediaBox = await media.boundingBox()
        for (const decoration of await media.locator('.hero-campana, .hero-calabaza, .hero-arana').all()) {
          const box = await decoration.boundingBox()
          assert.ok(box.x >= mediaBox.x && box.y >= mediaBox.y
            && box.x + box.width <= mediaBox.x + mediaBox.width
            && box.y + box.height <= mediaBox.y + mediaBox.height,
          'Seasonal copy and artwork must fit wholly inside the photograph')
        }
        assert.equal(await page.locator('#salon .titulo-seccion').evaluate((heading) =>
          getComputedStyle(heading, '::before').content), 'none')
        assert.equal(await hero.locator('.boton').evaluate((button) =>
          getComputedStyle(button, '::before').backgroundImage), 'none')
        if (await page.locator('html').getAttribute('data-tema') === 'halloween') {
          assert.match(await media.innerText(), /Halloween/)
        }
      })

      await t.test('Leaves both cookie controls visually clear and the map inactive', async () => {
        const map = page.locator('iframe[data-src-consentido]')
        assert.equal(await map.count(), 1)
        assert.equal(await map.getAttribute('src'), null)
        const banner = page.getByRole('region', { name: 'Aviso de cookies' })
        assert.ok(await banner.isVisible())
        // Include pointer-transparent artwork in the visual stacking check.
        const clearControls = await page.evaluate((selector) => {
          const art = [...document.querySelectorAll(selector)]
          const styles = art.map((element) => element.getAttribute('style'))
          art.forEach((element) => element.style.setProperty('pointer-events', 'auto', 'important'))
          try {
            return [...document.querySelectorAll('#aviso-cookies button')].every((button) => {
              const rect = button.getBoundingClientRect()
              return [0.05, 0.25, 0.5, 0.75, 0.95].every((x) =>
                [0.1, 0.5, 0.9].every((y) => button.contains(document.elementFromPoint(
                  rect.x + rect.width * x, rect.y + rect.height * y))))
            })
          } finally {
            art.forEach((element, index) => {
              if (styles[index] === null) element.removeAttribute('style')
              else element.setAttribute('style', styles[index])
            })
          }
        }, decorations)
        assert.ok(clearControls, 'Seasonal artwork must not paint over either cookie control')
        for (const name of ['Aceptar', 'Rechazar']) {
          const button = banner.getByRole('button', { name, exact: true })
          const box = await button.boundingBox()
          assert.ok(box && box.x >= 0 && box.y >= 0
            && box.x + box.width <= width && box.y + box.height <= page.viewportSize().height)
          assert.ok(await button.evaluate((element) => {
            const rect = element.getBoundingClientRect()
            return [0.15, 0.5, 0.85].every((fraction) =>
              element.contains(document.elementFromPoint(rect.x + rect.width * fraction,
                rect.y + rect.height / 2)))
          }))
        }
      })

      await t.test('Rejection keeps the map inactive and exposes the mobile photograph', async () => {
        const banner = page.getByRole('region', { name: 'Aviso de cookies' })
        await banner.getByRole('button', { name: 'Rechazar', exact: true }).click()
        assert.equal(await banner.isVisible(), false)
        assert.equal(await page.locator('iframe[data-src-consentido]').getAttribute('src'), null)
        if (width < 768) {
          const photo = await hero.locator('.imagen > img').boundingBox()
          const visibleHeight = Math.min(photo.y + photo.height, 844 - 56) - Math.max(photo.y, 0)
          assert.ok(visibleHeight >= 180, `Only ${visibleHeight}px of the photo is visible`)
        }
      })
      await page.close()
    })
  })
}

test('Shared service Layout preserves route content and consent defaults', async () => {
  await withBrowser(async ({ browser, url }) => {
    const cases = [
      ['manicura-rivas-vaciamadrid', 'Manicura', 'una manicura'],
      ['pedicura-rivas-vaciamadrid', 'Pedicura', 'una pedicura'],
      ['unas-de-gel-rivas-vaciamadrid', 'Uñas de gel', 'unas uñas de gel'],
    ]
    const observed = []
    for (const [slug, name, service] of cases) {
      const page = await browser.newPage({ reducedMotion: 'reduce' })
      const response = await page.goto(`${url}/${slug}/`)
      assert.equal(response.status(), 200)
      const heading = (await page.locator('main h1').innerText()).replace(/\s+/g, ' ').trim()
      assert.equal(heading, `${name} en Rivas Vaciamadrid`)
      const title = await page.title()
      assert.equal(title, `${name} en Rivas Vaciamadrid · Nanci Nails`)
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),
        `https://nancinails.es/${slug}/`)
      assert.equal(await page.getByRole('link', { name: 'Saltar al contenido' }).getAttribute('href'),
        '#contenido')
      const booking = new URL(await page.locator('.portada a[href^="https://wa.me/"]').getAttribute('href'))
      assert.equal(booking.searchParams.get('text'), `Hola Nanci, me gustaría pedir cita para ${service}.`)
      const map = page.locator('iframe[data-src-consentido]')
      assert.equal(await map.getAttribute('src'), null)
      const banner = page.getByRole('region', { name: 'Aviso de cookies' })
      assert.ok(await banner.isVisible())
      observed.push({ slug, heading, title, booking: booking.href, mapSrc: await map.getAttribute('src') })
      await page.close()
    }
    console.log('Preserved service behavior:', JSON.stringify(observed))
  })
})
