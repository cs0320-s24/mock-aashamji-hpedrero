import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('loadcsv');
  await expect(page.getByPlaceholder('Enter command here!')).toHaveValue('loadcsv');
  await page.locator('div').filter({ hasText: 'CSV loaded!' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('viewcsv');
  await expect(page.getByPlaceholder('Enter command here!')).toHaveValue('viewcsv');
  await page.getByRole('button', { name: 'Submit' }).click();

});