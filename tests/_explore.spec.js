import {test} from '@playwright/test';

test('explore selectors', async ({ page }) => {
  await page.goto('https://dev-cms.plaee.dev/home');           
  await page.pause();
})