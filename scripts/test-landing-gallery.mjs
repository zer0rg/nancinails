import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { withBrowser } from './browser-test-support.mjs'

const cards = '#trabajos .pieza'
const visibleCards = `${cards}:visible`
const revealName = 'Ver más trabajos'

async function openPage(browser, url, options = {}) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    ...options,
  })
  const page = await context.newPage()
  page.setDefaultTimeout(2000)
  await page.goto(url)
  const reject = page.getByRole('button', { name: 'Rechazar', exact: true })
  if (await reject.isVisible()) await reject.click()
  return { context, page }
}

async function counter(page, value) {
  await page.waitForFunction((expected) =>
    document.querySelector('[data-visor-contador]')?.textContent === expected, value)
  assert.equal(await page.locator('[data-visor-contador]').textContent(), value)
}

async function consultation(page, title) {
  const link = page.getByRole('link', { name: 'Consultar este diseño', exact: true })
  assert.equal(await link.isVisible(), true)
  const href = new URL(await link.getAttribute('href'))
  assert.equal(href.origin, 'https://wa.me')
  assert.equal(href.pathname, '/34648760840')
  assert.equal(href.searchParams.get('text'), `Hola Nanci, me gustaría pedir cita para ${title}.`)
}

test('gallery preservation and reveal behavior', async (t) => {
  await withBrowser(async ({ browser, url }) => {
    await t.test('preserves complete service galleries, metadata and keyboard controls', async () => {
      for (const [slug, count] of [
        ['manicura-rivas-vaciamadrid', 26],
        ['unas-de-gel-rivas-vaciamadrid', 4],
        ['pedicura-rivas-vaciamadrid', 3],
      ]) {
        const { context, page } = await openPage(browser, `${url}/${slug}/`, {
          viewport: { width: 390, height: 1000 },
        })
        try {
          assert.equal(await page.locator(visibleCards).count(), count)
          assert.equal(await page.getByRole('button', { name: revealName }).isVisible(), false)
          const metadata = await page.locator(cards).evaluateAll((items) => items.map((item) => {
            const image = item.querySelector('img')
            return {
              title: item.querySelector('h3').textContent,
              label: item.getAttribute('aria-label'),
              alt: image.alt, width: image.getAttribute('width'), height: image.getAttribute('height'),
              src: image.getAttribute('src'), srcset: image.getAttribute('srcset'),
              sizes: image.getAttribute('sizes'), loading: image.loading,
            }
          }))
          console.log(`service-baseline ${slug} ${createHash('sha256').update(JSON.stringify(metadata)).digest('hex')}`)
          const first = page.locator(cards).first()
          await first.focus()
          assert.equal(await first.locator('.overlay').evaluate((el) => getComputedStyle(el).opacity), '1')
          await page.keyboard.press('Enter')
          await counter(page, `1 / ${count}`)
          assert.equal(await page.getByRole('button', { name: 'Trabajo anterior' }).isDisabled(), true)
          await page.keyboard.press('ArrowRight')
          await counter(page, `2 / ${count}`)
          await page.keyboard.press('ArrowLeft')
          await counter(page, `1 / ${count}`)
          await page.keyboard.press('Escape')
          assert.equal(await page.getByRole('dialog').isVisible(), false)
          assert.equal(await first.evaluate((el) => el === document.activeElement), true)
          await page.keyboard.press('Space')
          await counter(page, `1 / ${count}`)
          await page.getByRole('button', { name: 'Cerrar visor' }).click()
          assert.equal(await page.getByRole('dialog').isVisible(), false)
          await first.hover()
          assert.equal(await first.locator('.overlay').evaluate((el) => getComputedStyle(el).opacity), '1')
        } finally {
          await context.close()
        }
      }
    })

    await t.test('keeps all thirty server-rendered photographs visible without JavaScript', async () => {
      const { context, page } = await openPage(browser, url, { javaScriptEnabled: false })
      try {
        assert.equal(await page.locator(cards).count(), 30)
        assert.equal(await page.locator(visibleCards).count(), 30)
        assert.equal(await page.getByRole('button', { name: revealName }).isVisible(), false)
        assert.equal(await page.locator(`${cards} img[alt][srcset][width][height]`).count(), 30)
      } finally {
        await context.close()
      }
    })

    await t.test('shows the first eight works and reveals all remaining works at each viewport', async () => {
      for (const width of [1440, 820, 390]) {
        const { context, page } = await openPage(browser, url, { viewport: { width, height: 1000 } })
        try {
          assert.equal(await page.locator(cards).count(), 30)
          assert.equal(await page.locator(visibleCards).count(), 8)
          const titles = await page.locator(`${cards} h3`).allTextContents()
          assert.deepEqual(await page.locator(`${visibleCards} h3`).allTextContents(), titles.slice(0, 8))
          await page.getByRole('button', { name: revealName, exact: true }).click()
          assert.equal(await page.locator(visibleCards).count(), 30)
          assert.equal(await page.getByRole('button', { name: revealName }).isVisible(), false)
          assert.equal(await page.locator(cards).nth(8).evaluate((el) => el === document.activeElement), true)
          assert.equal(await page.locator('#trabajos .cierre').getByRole('link', {
            name: 'Reservar por WhatsApp', exact: true,
          }).isVisible(), true)
        } finally {
          await context.close()
        }
      }
    })

    await t.test('filters matching works, resets expansion and hides unnecessary reveal controls', async () => {
      const { context, page } = await openPage(browser, url)
      try {
        await page.getByRole('button', { name: 'Manicura', exact: true }).click()
        assert.equal(await page.locator(visibleCards).count(), 8)
        await page.getByRole('button', { name: revealName }).click()
        assert.equal(await page.locator(visibleCards).count(), 26)
        await page.getByRole('button', { name: 'Diseño', exact: true }).click()
        assert.equal(await page.locator(visibleCards).count(), 8)
        assert.equal(await page.getByRole('button', { name: 'Diseño', exact: true }).getAttribute('aria-pressed'), 'true')
        await page.getByRole('button', { name: revealName }).click()
        assert.equal(await page.locator(visibleCards).count(), 16)
        await page.getByRole('button', { name: 'Pedicura', exact: true }).click()
        assert.deepEqual(await page.locator(`${visibleCards} h3`).allTextContents(), [
          'Pedicura roja a juego', 'Pedicura rosa pastel brillante', 'Pedicura rosa pastel corta',
        ])
        assert.equal(await page.getByRole('button', { name: revealName }).isVisible(), false)
        await page.getByRole('button', { name: 'Todos', exact: true }).click()
        assert.equal(await page.locator(visibleCards).count(), 8)
        assert.equal(await page.getByRole('button', { name: revealName }).isVisible(), true)
      } finally {
        await context.close()
      }
    })

    await t.test('consults the selected work before any filtering or navigation', async () => {
      const { context, page } = await openPage(browser, url)
      try {
        await page.locator(cards).first().click()
        await counter(page, '1 / 30')
        await consultation(page, 'Almendra negra con efecto carey')
      } finally {
        await context.close()
      }
    })
  })
})

test('navigates unrevealed matches with correct consultation links, boundaries and close focus', async () => {
  await withBrowser(async ({ browser, url }) => {
    const { context, page } = await openPage(browser, url, { hasTouch: true })
    try {
      await page.getByRole('button', { name: 'Diseño', exact: true }).click()
      assert.equal(await page.locator(visibleCards).count(), 8)
      await page.locator(visibleCards).nth(7).click()
      await counter(page, '8 / 16')
      await consultation(page, 'Degradado rosa sobre flores blancas')
      await page.keyboard.press('ArrowRight')
      await counter(page, '9 / 16')
      await consultation(page, 'Francesa neón multicolor con extensión')
      assert.equal(await page.getByRole('heading', { name: 'Francesa neón multicolor con extensión', exact: true }).isVisible(), true)
      const media = await page.locator('.visor-media').boundingBox()
      const input = await context.newCDPSession(page)
      const y = media.y + media.height / 2
      // Real touch input avoids the browser's native desktop image drag.
      await input.send('Input.dispatchTouchEvent', {
        type: 'touchStart', touchPoints: [{ x: media.x + media.width * 0.75, y }],
      })
      await input.send('Input.dispatchTouchEvent', {
        type: 'touchMove', touchPoints: [{ x: media.x + media.width * 0.25, y }],
      })
      await input.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      await input.detach()
      await counter(page, '10 / 16')
      await consultation(page, 'Rosa neón con francesa invertida')
      for (let n = 11; n <= 16; n++) {
        await page.keyboard.press('ArrowRight')
        await counter(page, `${n} / 16`)
      }
      assert.equal(await page.getByRole('button', { name: 'Trabajo siguiente' }).isDisabled(), true)
      await consultation(page, 'Francesa turquesa con flores blancas')
      await page.keyboard.press('ArrowRight')
      await counter(page, '16 / 16')
      await page.keyboard.press('Escape')
      assert.equal(await page.getByRole('dialog').isVisible(), false)
      const focused = page.locator(`${cards}:focus`)
      assert.equal(await focused.isVisible(), true)
      assert.equal(await focused.locator('h3').textContent(), 'Francesa turquesa con flores blancas')
      await page.keyboard.press('Space')
      await counter(page, '16 / 16')
      await consultation(page, 'Francesa turquesa con flores blancas')
    } finally {
      await context.close()
    }
  })
})


test('the abbreviated gallery fills its final row and restores the full mosaic on reveal', async () => {
  await withBrowser(async ({ browser, url }) => {
    for (const width of [1440, 768, 390]) {
      const { context, page } = await openPage(browser, url, { viewport: { width, height: 1000 } })
      try {
        const geometry = await page.locator('[data-galeria-lista]').evaluate((list) => {
          const bounds = list.getBoundingClientRect()
          const cards = [...list.children].map((card) => card.getBoundingClientRect()).filter((rect) => rect.height > 0)
          const lastTop = Math.max(...cards.map((rect) => rect.top))
          const lastRow = cards.filter((rect) => Math.abs(rect.top - lastTop) < 1)
          const style = getComputedStyle(list)
          return {
            left: bounds.left + parseFloat(style.paddingLeft),
            right: bounds.right - parseFloat(style.paddingRight),
            rowLeft: lastRow[0].left, rowRight: lastRow.at(-1).right,
          }
        })
        assert.ok(Math.abs(geometry.left - geometry.rowLeft) <= 1, JSON.stringify({ width, ...geometry }))
        assert.ok(Math.abs(geometry.right - geometry.rowRight) <= 1, JSON.stringify({ width, ...geometry }))
        await page.getByRole('button', { name: revealName }).click()
        assert.equal(await page.locator(visibleCards).count(), 30)
        if (width >= 768) {
          assert.equal(await page.locator('.pieza[data-destacada]').first().evaluate((card) =>
            getComputedStyle(card).gridColumnStart), 'span 2')
        }
      } finally {
        await context.close()
      }
    }
  })
})
