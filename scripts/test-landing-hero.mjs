import assert from 'node:assert/strict'
import test from 'node:test'
import { withBrowser } from './browser-test-support.mjs'

const photoAlt = 'Uñas almendradas en negro con efecto carey y una flor difuminada, sobre adelfas rosas'
const halloweenAlt = 'Manicura de inspiración Halloween en negro y naranja, con un murciélago y una telaraña fina sobre fondo otoñal'
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

      await t.test('Uses the campaign photograph while preserving the default photograph', async () => {
        const image = hero.locator('.imagen > img')
        const seasonal = await page.locator('html').getAttribute('data-tema') === 'halloween'
        assert.equal(await image.getAttribute('alt'), seasonal ? halloweenAlt : photoAlt)
        assert.match(await image.getAttribute('src'), seasonal ? /\/hero-halloween\.[^/]+$/ : /\/hero\.[^/]+$/)
        assert.ok(await image.evaluate((img) => img.complete && img.naturalWidth > 0))
        const media = hero.locator('.imagen')
        assert.equal(await media.evaluate((element) => getComputedStyle(element).overflow), 'hidden')
        const outside = await page.locator(decorations).evaluateAll((elements) =>
          elements.filter((element) => !element.closest('.hero .imagen') && !element.matches('.bandada')).length)
        assert.equal(outside, 0, 'Only the requested bat flock may sit outside hero media')
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
        if (seasonal) assert.match(await media.innerText(), /Halloween/)
      })

      await t.test('Removes the unwanted pumpkin without relocating it', async () => {
        assert.equal(await page.locator('.hero-calabaza, .calabaza-flotante').count(), 0)
      })

      await t.test('Restores the spider above the booking button only for Halloween', async () => {
        const seasonal = await page.locator('html').getAttribute('data-tema') === 'halloween'
        const spider = await hero.locator('.boton').evaluate((button) => {
          const rect = button.getBoundingClientRect()
          const style = getComputedStyle(button, '::before')
          return { image: style.backgroundImage, top: rect.top + rect.height - parseFloat(style.bottom) - parseFloat(style.height), right: rect.right - parseFloat(style.right) }
        })
        if (seasonal) {
          assert.match(spider.image, /arana\.svg/)
          assert.ok(spider.top < (await hero.locator('.boton').boundingBox()).y)
          assert.ok(spider.right <= width)
        } else assert.equal(spider.image, 'none')
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

test('Original flying bats respect reduced motion and leave consent controls operable', async () => {
  await withBrowser(async ({ browser, url }) => {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'no-preference',
    })
    await page.goto(url)
    const seasonal = await page.locator('html').getAttribute('data-tema') === 'halloween'
    const flock = page.locator('.bandada')
    assert.equal(await flock.count(), seasonal ? 1 : 0)
    if (seasonal) {
      assert.equal(await flock.getAttribute('aria-hidden'), 'true')
      assert.equal(await flock.evaluate((element) => getComputedStyle(element).pointerEvents), 'none')
      const bats = flock.locator('.vuelo')
      assert.equal(await bats.count(), 4)
      assert.equal(await bats.evaluateAll((elements) =>
        elements.filter((element) => getComputedStyle(element).display !== 'none').length), 2)
      assert.ok(await bats.first().evaluate((element) =>
        getComputedStyle(element).animationName !== 'none'))
      const initial = await bats.first().evaluate((element) => element.getBoundingClientRect().x)
      await page.waitForFunction((previous) =>
        document.querySelector('.vuelo').getBoundingClientRect().x !== previous, initial)
      // Wait for the banner's existing entrance animation, without choosing consent.
      await page.getByRole('button', { name: 'Rechazar', exact: true }).click({ trial: true })
      const clear = await page.evaluate(() => {
        const art = document.querySelector('.bandada')
        art.style.pointerEvents = 'auto'
        try {
          return [...document.querySelectorAll('#aviso-cookies button')].every((button) => {
            const rect = button.getBoundingClientRect()
            return button.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2))
          })
        } finally {
          art.style.removeProperty('pointer-events')
        }
      })
      assert.ok(clear, 'The flying artwork must remain below both consent controls')
      await page.getByRole('button', { name: 'Rechazar', exact: true }).click()
      assert.equal(await page.locator('iframe[data-src-consentido]').getAttribute('src'), null)
      assert.equal(await page.evaluate(() => localStorage.getItem('nn-cookies')), 'rechazar')
      await page.emulateMedia({ reducedMotion: 'reduce' })
      assert.equal(await flock.isVisible(), false)
    }
    await page.close()
  })
})
