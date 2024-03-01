import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('hello');
  await page.getByRole('button', { name: 'Submit' }).click();
});


test('testing complete mocked test', async ({ page }) => {
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

test('testing command not recognised (fuzz1)', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('abcdef');
  await expect(page.getByPlaceholder('Enter command here!')).toHaveValue('abcdef');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command not recognized');
});

test('testing mode command not brief or verbose (fuzz2)', async ({ page }) => {
  await page.goto('http://localhost:8001/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('loadcsv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: loadcsv Output: CSV loaded!');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode xyzabc');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: mode xyzabc Output: ERROR USAGE: mode + <brief / verbose>');
});

test('testing no input', async ({page}) => {
  await page.goto('http://localhost:8001/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: Output: Command not recognized');
});



