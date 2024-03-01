import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByPlaceholder('Enter command here!')).toBeEmpty();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('loadcsv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('CSV loaded!');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('viewcsv');
  await expect(page.getByPlaceholder('Enter command here!')).toHaveValue('viewcsv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('[["ID","Name","Occupation","Age"],["1","John Doe","Software Engineer","30"],["2","Jane Smith","Data Scientist","28"],["3","Alice Johnson","Product Manager","35"],["4","Bob Brown","Graphic Designer","26"],["5","Charlie Davis","Marketing Specialist","32"]]');
});