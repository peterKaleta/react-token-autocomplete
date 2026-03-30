import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Token Autocomplete — interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with all example sections', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('react-token-autocomplete')
    // 8 example sections
    const sections = page.locator('h2')
    await expect(sections).toHaveCount(8)
  })

  test('controlled: state updates on add and remove', async ({ page }) => {
    const section = page.locator('h2:has-text("Controlled")').locator('..')
    const input = section.getByTestId('token-input')
    const stateDisplay = section.locator('.font-mono')

    // Initial state has React
    await expect(stateDisplay).toContainText('["React"]')

    // Add a token
    await input.click()
    await input.fill('Vue')
    const option = section.getByTestId('option').filter({ hasText: 'Vue' })
    await option.click()
    await expect(stateDisplay).toContainText('["React","Vue"]')

    // Remove first token
    await section.getByTestId('token-remove').first().click()
    await expect(stateDisplay).toContainText('["Vue"]')
  })

  test('basic: add and remove a token', async ({ page }) => {
    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('React')
    await input.press('Enter')

    // Token should appear
    const token = section.getByTestId('token').first()
    await expect(token).toContainText('React')

    // Remove it
    await token.getByTestId('token-remove').click()
    await expect(section.getByTestId('token')).toHaveCount(0)
  })

  test('basic: click an option to add it', async ({ page }) => {
    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('Vue')

    const option = section.getByTestId('option').filter({ hasText: 'Vue' })
    await option.click()

    await expect(section.getByTestId('token')).toContainText(['Vue'])
  })

  test('basic: keyboard navigation with arrow keys', async ({ page }) => {
    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('a')

    // First option selected by default
    const options = section.getByTestId('option')
    await expect(options.first()).toHaveAttribute('aria-selected', 'true')

    // Arrow down
    await input.press('ArrowDown')
    await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true')

    // Arrow up back
    await input.press('ArrowUp')
    await expect(options.first()).toHaveAttribute('aria-selected', 'true')
  })

  test('basic: escape closes dropdown', async ({ page }) => {
    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('R')
    await expect(section.getByTestId('options')).toBeVisible()

    await input.press('Escape')
    await expect(section.getByTestId('options')).not.toBeVisible()
  })

  test('basic: backspace removes last token', async ({ page }) => {
    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    // Add two tokens
    await input.click()
    await input.fill('React')
    await input.press('Enter')
    await input.fill('Vue')
    await input.press('Enter')
    await expect(section.getByTestId('token')).toHaveCount(2)

    // Backspace on empty input removes last
    await input.press('Backspace')
    await expect(section.getByTestId('token')).toHaveCount(1)
    await expect(section.getByTestId('token').first()).toContainText('React')
  })

  test('threshold: does not show options below threshold', async ({ page }) => {
    const section = page.locator('h2:has-text("Threshold")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('Re')
    await expect(section.getByTestId('options')).not.toBeVisible()

    await input.fill('Rea')
    await expect(section.getByTestId('options')).toBeVisible()
  })

  test('limit to options: no custom values', async ({ page }) => {
    const section = page.locator('h2:has-text("Limit to Options")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('NotAColor')
    await expect(section.getByTestId('options')).not.toBeVisible()
  })

  test('simulate select: hides input after selection', async ({ page }) => {
    const section = page.locator('h2:has-text("Simulate Select")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('React')
    await input.press('Enter')

    await expect(section.getByTestId('token-input')).not.toBeVisible()
    await expect(section.getByTestId('token')).toHaveCount(1)

    // Remove to get input back
    await section.getByTestId('token-remove').click()
    await expect(section.getByTestId('token-input')).toBeVisible()
  })

  test('default values: renders pre-populated tokens', async ({ page }) => {
    const section = page.locator('h2:has-text("Default Values")').locator('..')
    const tokens = section.getByTestId('token')
    await expect(tokens).toHaveCount(2)
    await expect(tokens.nth(0)).toContainText('React')
    await expect(tokens.nth(1)).toContainText('Vue')
  })

  test('processing: shows spinner when toggled', async ({ page }) => {
    const section = page.locator('h2:has-text("Processing")').locator('..')
    await expect(section.getByTestId('processing')).not.toBeVisible()

    await section.getByRole('button', { name: /Toggle processing/ }).click()
    await expect(section.getByTestId('processing')).toBeVisible()
  })

  test('custom rendering: tokens have color dots', async ({ page }) => {
    const section = page.locator('h2:has-text("Custom Rendering")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('Red')

    // Option should have a colored dot
    const option = section.getByTestId('option').filter({ hasText: 'Red' })
    await expect(option.locator('span.rounded-full')).toBeVisible()

    await option.click()

    // Token should also have a colored dot
    const token = section.getByTestId('token').first()
    await expect(token.locator('span.rounded-full')).toBeVisible()
  })
})

test.describe('Token Autocomplete — visual regression', () => {
  test('examples page screenshot', async ({ page }) => {
    await page.goto('/')
    // Wait for Tailwind CDN to load
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('examples-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('dropdown open state screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('a')
    await expect(section.getByTestId('options')).toBeVisible()

    await expect(section).toHaveScreenshot('dropdown-open.png', {
      maxDiffPixelRatio: 0.01,
    })
  })

  test('with tokens screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('React')
    await input.press('Enter')
    await input.fill('Vue')
    await input.press('Enter')
    await input.fill('Svelte')
    await input.press('Enter')

    await expect(section).toHaveScreenshot('with-tokens.png', {
      maxDiffPixelRatio: 0.01,
    })
  })
})

test.describe('Token Autocomplete — accessibility', () => {
  test('page has no accessibility violations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .exclude('.animate-spin') // exclude spinner which may flag
      .analyze()

    expect(results.violations).toEqual([])
  })

  test('dropdown state has no accessibility violations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const section = page.locator('h2:has-text("Basic")').locator('..')
    const input = section.getByTestId('token-input')

    await input.click()
    await input.fill('a')
    await expect(section.getByTestId('options')).toBeVisible()

    const results = await new AxeBuilder({ page })
      .exclude('.animate-spin')
      .analyze()

    expect(results.violations).toEqual([])
  })
})
