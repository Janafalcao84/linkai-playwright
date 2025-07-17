import { test, expect } from '@playwright/test';

test('deve exibir o titulo', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Linkaí/);

  await page.waitForTimeout(3000)
});


