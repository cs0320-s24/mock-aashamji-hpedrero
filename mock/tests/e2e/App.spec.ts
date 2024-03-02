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
  //ONCE FILEPATH ADDED, CHANGE ACCORDINGLY
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateListings.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Listings CSV loaded!');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('viewcsv');
  await expect(page.getByPlaceholder('Enter command here!')).toHaveValue('viewcsv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('[["ID","Address","Price","Bedrooms","Bathrooms","SquareFeet"],["1","123 Maple Street","350000","3","2","2000"],["2","456 Oak Avenue","450000","4","3","2500"],["3","789 Pine Lane","550000","5","4","3000"]]');
});

test('testing command not recognised', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('abcdef');
  await expect(page.getByPlaceholder('Enter command here!')).toHaveValue('abcdef');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command not recognized');
});

test('testing mode command not brief or verbose', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  //ONCE FILEPATH ADDED, CHANGE ACCORDINGLY
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateAgents.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Agents CSV loaded');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode xyzabc');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: mode xyzabc Output: ERROR USAGE: mode + <brief / verbose>');
});

test('loading two different files', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  //ONCE FILEPATH ADDED, CHANGE ACCORDINGLY
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateAgents.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Agents CSV loaded');
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateAgents.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Agents CSV loaded');
});

test('testing double load', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  //ONCE FILEPATH ADDED, CHANGE ACCORDINGLY
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateAgents.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Agents CSV loaded');
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateAgents.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Agents CSV loaded');
});

test('testing searchcsv', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateListings.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: loadcsv /path/to/realEstateListings.csv Output: Listings CSV loaded!');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('searchcsv Avenue');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: searchcsv Avenue Output: [["2","456 Oak Avenue","450000","4","3","2500"]]');
});

test('testing searchcsv fuzz', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('loadcsv /path/to/realEstateListings.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: loadcsv /path/to/realEstateListings.csv Output: Listings CSV loaded!');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('searchcsv Donkey Kong');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#root')).toContainText('Command: searchcsv Donkey Kong Output: []');
});










