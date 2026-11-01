import assert from 'node:assert/strict'
import test from 'node:test'
import { withBrowser } from './browser-test-support.mjs'

test('the regular build disables the Halloween campaign across public routes', async () => {
  await withBrowser(async ({ browser, url }) => {
    const page = await browser.newPage({ reducedMotion: 'reduce' })
    await page.goto(url)
    const serviceRoutes = await page.locator('#tarifas a[href^="/"]').evaluateAll(links =>
      [...new Set(links.map(link => link.getAttribute('href')))])
    for (const route of ['/', ...serviceRoutes]) {
      const response = await page.goto(url + route)
      assert.equal(response.status(), 200)
      assert.equal(await page.locator('html').getAttribute('data-tema'), 'default')
      assert.equal(await page.locator('.bandada, .halloween-escena, .hero-campana, .hero-calabaza, .hero-arana, .calabaza-flotante').count(), 0)
      assert.equal(await page.locator('iframe[data-src-consentido]').getAttribute('src'), null)
      if (route === '/') {
        const hero = page.locator('.hero')
        assert.match(await hero.locator('.imagen > img').getAttribute('src'), /\/hero\.[^/]+$/)
        assert.equal(await hero.locator('.boton').evaluate(button => getComputedStyle(button, '::before').backgroundImage), 'none')
        const booking = new URL(await hero.locator('.boton').getAttribute('href'))
        assert.equal(booking.searchParams.get('text'), 'Hola Nanci, me gustaría pedir cita.')
      }
    }
    await page.close()
  })
})
