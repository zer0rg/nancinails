import assert from 'node:assert/strict'
import test from 'node:test'
import { withBrowser } from './browser-test-support.mjs'

test('the homepage summarizes all six service groups without losing any service', async () => {
  await withBrowser(async ({ browser, url }) => {
    const page = await browser.newPage({ javaScriptEnabled: false })
    await page.goto(url)
    const groups = page.locator('#tarifas details')
    assert.equal(await groups.count(), 6)
    assert.equal(await page.locator('#tarifas .fila').count(), 17)
    assert.equal(await page.locator('#tarifas .fila:visible').count(), 0)
    for (const [index, count] of [4, 3, 2, 4, 2, 2].entries()) {
      await groups.nth(index).locator('summary').click()
      assert.equal(await groups.nth(index).locator('.fila:visible').count(), count)
    }
    assert.match(await groups.nth(0).innerText(), /Manicura express/)
    assert.match(await groups.nth(0).innerText(), /30 min/)
    assert.match(await groups.nth(1).innerText(), /Retirada de gel/)
    assert.match(await groups.nth(2).innerText(), /Pedicura spa/)
    assert.match(await groups.nth(4).innerText(), /Depilación de cejas con hilo/)
    assert.match(await groups.nth(5).innerText(), /Parafina para los pies/)
    for (const route of ['manicura-rivas-vaciamadrid', 'pedicura-rivas-vaciamadrid', 'unas-de-gel-rivas-vaciamadrid', 'depilacion-con-hilo-rivas-vaciamadrid']) {
      assert.equal(await page.locator(`#tarifas a[href='/${route}/']`).count(), 1)
    }
    await page.close()
  })
})

test('the reading journey reaches real people before an exhaustive catalog', async () => {
  await withBrowser(async ({ browser, url }) => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
    await page.goto(url)
    const order = await page.locator('main').evaluate((main) => [...main.children]
      .filter((element) => element.matches('section'))
      .map((element) => element.id || element.className))
    assert.ok(order.indexOf('trabajos') < order.indexOf('tarifas'))
    assert.ok(order.indexOf('tarifas') < order.indexOf('salon'))
    const salonTop = await page.locator('#salon').evaluate((element) => element.getBoundingClientRect().top + scrollY)
    assert.ok(salonTop < 5000, `Salon starts at ${salonTop}px`)
    const heading = page.locator('#salon .principal')
    assert.ok((await heading.innerText()).split(/\s+/).length <= 12)
    const size = await heading.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))
    assert.ok(size <= 24)
    await page.close()
  })
})

test('compact team and appointment photographs share a row without unequal frames', async () => {
  await withBrowser(async ({ browser, url }) => {
    for (const width of [1920, 1440, 1024, 768, 390, 360]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
      await page.goto(url)
      await page.locator('.equipo').scrollIntoViewIfNeeded()
      await page.locator('.equipo img').evaluate((image) => image.decode())
      const image = await page.locator('.equipo img').boundingBox()
      const heading = await page.locator('.equipo h2').boundingBox()
      const appointment = await page.locator('.atencion img').boundingBox()
      if (width >= 960) {
        assert.ok(image.width <= width * 0.55, `Team image still dominates: ${image.width}px`)
        assert.ok(Math.abs(image.width - appointment.width) <= 1)
        assert.ok(Math.abs(image.height - appointment.height) <= 1)
        assert.ok(Math.abs(image.y - appointment.y) <= 1)
        assert.ok(appointment.x >= image.x + image.width - 1)
      } else {
        assert.ok(Math.abs(image.width - width) <= 1)
        assert.ok(appointment.y >= image.y + image.height)
      }
      assert.ok(image.y > heading.y + heading.height)
      assert.ok(Math.abs(image.width / image.height - 1.5) < 0.01)
      assert.match(await page.locator('.equipo img').getAttribute('alt'), /tres integrantes/)
      const ratios = await page.locator('.detalles img').evaluateAll((images) => images.map((image) => {
        const rect = image.getBoundingClientRect()
        return rect.width / rect.height
      }))
      assert.ok(ratios.every((ratio) => Math.abs(ratio - 1.5) < 0.01))
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      await page.close()
    }
  })
})

test('service labels remain honest and existing service-page catalogs stay complete', async () => {
  await withBrowser(async ({ browser, url }) => {
    const page = await browser.newPage()
    for (const [route, rows] of [['/', 17], ['/manicura-rivas-vaciamadrid/', 8], ['/pedicura-rivas-vaciamadrid/', 2], ['/unas-de-gel-rivas-vaciamadrid/', 7], ['/depilacion-con-hilo-rivas-vaciamadrid/', 2]]) {
      await page.goto(url + route)
      assert.equal(await page.locator('#tarifas .fila').count(), rows)
      assert.equal(await page.locator('header a').filter({ hasText: 'Servicios' }).count(), 1)
      assert.equal(await page.getByRole('link', { name: /ver tarifas/i }).count(), 0)
      assert.equal(await page.locator('main').getByText(/precio y duración/i).count(), 0)
      if (route !== '/') assert.equal(await page.locator('#tarifas details').count(), 0)
    }
    await page.close()
  })
})

test('the threading landing answers the local intent without inventing a gallery', async () => {
  await withBrowser(async ({ browser, url }) => {
    const page = await browser.newPage({ javaScriptEnabled: false })
    const response = await page.goto(`${url}/depilacion-con-hilo-rivas-vaciamadrid/`)
    assert.equal(response.status(), 200)
    assert.equal((await page.locator('main h1').innerText()).replace(/\s+/g, ' ').trim(),
      'Depilación con hilo en Rivas Vaciamadrid')
    assert.equal(await page.title(), 'Depilación con hilo en Rivas Vaciamadrid · Nanci Nails')
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),
      'https://nancinails.es/depilacion-con-hilo-rivas-vaciamadrid/')
    const rows = page.locator('#tarifas .fila')
    assert.equal(await rows.count(), 2)
    assert.match(await rows.nth(0).innerText(), /cejas/i)
    assert.match(await rows.nth(0).innerText(), /15 min/)
    assert.match(await rows.nth(1).innerText(), /labio/i)
    assert.match(await rows.nth(1).innerText(), /5 min/)
    assert.equal(await page.locator('#trabajos').count(), 0,
      'Threading has no photographs of its own, so it must not borrow the nail gallery')
    const booking = new URL(await page.locator('.portada a[href^="https://wa.me/"]').getAttribute('href'))
    assert.equal(booking.searchParams.get('text'), 'Hola Nanci, me gustaría pedir cita para la depilación con hilo.')
    await page.close()
  })
})

test('service disclosures animate opening and respect reduced motion without JavaScript', async () => {
  await withBrowser(async ({ browser, url }) => {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ javaScriptEnabled: false, reducedMotion })
      await page.goto(url)
      const groups = page.locator('#tarifas details')
      for (const group of await groups.all()) {
        const summary = group.locator('summary')
        const content = group.locator('.contenido-grupo')
        await summary.click()
        assert.equal(await group.getAttribute('open'), '')
        const motion = await content.evaluate(async (element) => {
          const animations = element.getAnimations().filter(animation => animation.effect.target === element)
          if (!animations.length) return { count: 0, opacity: getComputedStyle(element).opacity }
          const animation = animations[0]
          animation.pause()
          await animation.ready
          animation.currentTime = animation.effect.getTiming().duration / 2
          const halfway = Number(getComputedStyle(element).opacity)
          animation.finish()
          return { count: animations.length, halfway, opacity: getComputedStyle(element).opacity }
        })
        if (reducedMotion === 'no-preference') {
          assert.equal(motion.count, 1, 'Opening must visibly animate each service group')
          assert.ok(motion.halfway > 0 && motion.halfway < 1)
        } else assert.equal(motion.count, 0, 'Reduced motion must bypass the animation')
        assert.equal(motion.opacity, '1')
        assert.ok(await content.isVisible())
        assert.equal(await summary.evaluate(element => element === document.activeElement), true)
        await summary.press('Enter')
        assert.equal(await group.getAttribute('open'), null)
        assert.equal(await content.isVisible(), false)
      }
      assert.equal(await page.locator('#tarifas .fila').count(), 17)
      await page.close()
    }
  })
})
