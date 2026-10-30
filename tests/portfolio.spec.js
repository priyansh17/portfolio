import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function navigate(page, label) {
  const menu = page.getByRole('button', { name: 'Open menu' });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label, exact: true }).click();
}

test('root stays canonical and capability cards go beyond languages', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(new URL(page.url()).pathname).toBe('/');
  await navigate(page, 'Stack');
  await expect(page).toHaveURL(/\/#skills$/);
  await expect(page.locator('.capability-card')).toHaveCount(6);
  await expect(page.getByRole('heading', { name: 'DevOps & Observability' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Resilience & Recovery' })).toBeVisible();
  await expect(page.locator('.hero-canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const [entry, destination, id] of [
  ['/portfolio/', '/', 'home'],
  ['/portfolio/#/projects', '/#projects', 'projects'],
  ['/#/career', '/#experience', 'experience'],
  ['/projects', '/#projects', 'projects'],
  ['/portfolio/skills/', '/#skills', 'skills'],
  ['/portfolio/#/certifications', '/#certifications', 'certifications'],
]) {
  test(`direct entry and refresh: ${entry}`, async ({ page }) => {
    await page.goto(entry);
    await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).hash).toBe(destination);
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await page.reload();
    await expect(page.locator(`#${id}`)).toBeInViewport();
    if (id === 'certifications') await expect(page.locator('#certifications')).toHaveAttribute('open', '');
  });
}

test('project details close with Escape and restore focus and position', async ({ page }) => {
  await page.goto('/#projects');
  const trigger = page.getByRole('link', { name: 'Details about Dear Diary' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page).toHaveURL(/#project-dear-diary$/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toBeInViewport();
});

test('non-featured projects are directly shareable without expanding the collection', async ({ page }) => {
  await page.goto('/#project-healthifyme');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'HealthifyMe Medical Chatbot', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close project details' }).click();
  await expect(page).toHaveURL(/#projects$/);
});

test('old project fragments normalize even after the app has mounted', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { window.location.hash = '#/project-healthifyme'; });
  await expect(page).toHaveURL(/#project-healthifyme$/);
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('progressive disclosure preserves earlier work and downloadable documents', async ({ page, request }) => {
  await page.goto('/#experience');
  await expect(page.getByRole('heading', { name: 'KPMG', exact: true })).not.toBeVisible();
  await page.getByText('Earlier experience', { exact: false }).click();
  await expect(page.getByRole('heading', { name: 'KPMG', exact: true })).toBeVisible();
  await page.locator('#certifications > summary').click();
  const certificate = page.getByRole('link', { name: 'Core JAVA', exact: true });
  await expect(certificate).toBeVisible();
  const pdf = await request.get(await certificate.getAttribute('href'));
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  const resume = await request.get(await page.getByRole('link', { name: 'Resume', exact: true }).getAttribute('href'));
  expect(resume.status()).toBe(200);
});

test('section navigation supports back, forward, and mobile menu dismissal', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  }
  await navigate(page, 'Work');
  await navigate(page, 'Stack');
  await page.goBack();
  await expect(page).toHaveURL(/#projects$/);
  await page.goForward();
  await expect(page).toHaveURL(/#skills$/);
});

test('theme persists and both themes meet automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  const dark = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(dark.violations).toEqual([]);
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  const light = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(light.violations).toEqual([]);
  await page.goto('/#project-dear-diary');
  const dialog = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(dialog.violations).toEqual([]);
});

test('small screens and zoom-sized viewports do not overflow', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('content works without storage or WebGL', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage blocked', 'SecurityError'); } });
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.startsWith('webgl')) return null;
      return getContext.call(this, type, ...args);
    };
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Static view' })).toBeVisible({ timeout: isMobile ? 5000 : 10000 });
  await navigate(page, 'Work');
  await expect(page.locator('#projects')).toBeInViewport();
});

test('unknown paths remain genuine useful 404s', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response.status()).toBe(404);
  await page.getByRole('link', { name: 'Back to the portfolio' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
