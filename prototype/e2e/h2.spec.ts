// The single end-to-end walk (D-062), in a real browser: H2, SIMULATED. The advisor completes
// the grant, which flags the employer stock; the client sees the same new lines live and in the
// shared PDF; advisor notices never reach the client.
import { expect, test } from '@playwright/test';

test('AC-G-09 · AC-G-10 · AC-G-11 · AC-G-12 · AC-E-17 · H2 from advisor to client: complete the grant, shares flagged, share', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Stock compensation in the Financial Health analysis')).toBeVisible();
  await page.getByRole('button', { name: 'Explore freely →' }).click();

  // Client view before: the pending line only (AC-E-10)
  await expect(page.getByText('Maya reported pay in Halden Robotics stock. It is not yet included in these figures.')).toBeVisible();

  // Advisor: complete the pending grant; its employer shares are flagged at once (AC-E-17)
  await page.getByLabel('View').selectOption('advisor');
  await page.getByRole('tab', { name: 'Data & Assumptions' }).click();
  await page.getByLabel('Stock compensation grants').getByRole('button', { name: 'Edit' }).click();
  const ed = page.getByLabel('Grant editor');
  await ed.getByLabel('Grant date').fill('2025-03-01');
  await ed.getByLabel('Units').fill('4000');
  await ed.getByRole('button', { name: 'Generate tranches' }).click();
  await ed.getByRole('button', { name: 'Save grant' }).click();
  await expect(page.getByText('Halden Robotics (HLDN) held in Maya brokerage and Maya 401(k) flagged as employer stock.')).toBeVisible();
  await expect(page.getByLabel('Stock compensation grants').getByText('complete')).toBeVisible();
  await expect(page.getByText('Vested on March 1, 2026: record the shares kept as a held position.')).toBeVisible();

  // Client view: the new lines, no advisor notice
  await page.getByLabel('View').selectOption('client');
  await page.getByRole('tab', { name: 'Financial health' }).click();
  const live = page.locator('[data-line]');
  await expect(page.getByText('Halden Robotics stock held across 2 accounts: $300,000, 30% of investable assets.')).toBeVisible();
  await expect(page.getByText('December 1, 2026: 250 units, $12,500, at the October 5, 2026 price.')).toBeVisible();
  await expect(page.getByText(/Vested on|Flag as employer stock|State withholding not entered/)).toHaveCount(0);
  const liveTexts = await live.allTextContents();

  // Shared PDF (print view): the same lines
  await page.getByLabel('View').selectOption('print');
  const pdfTexts = await page.locator('[data-line]').allTextContents();
  for (const t of liveTexts) expect(pdfTexts).toContain(t);
  await expect(page.getByText(/Vested on|Flag as employer stock/)).toHaveCount(0);
});
