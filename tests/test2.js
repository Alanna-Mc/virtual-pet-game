/* Test ensures the users pet name is accepted once the submit button is clicked */

// Import the 'firefox' module from the 'playwright' library.
const { firefox } = require('playwright');

// Async test arrow function to intect with an element.
const testSubmitPetName = async () => {
  // Launch a Firefox browser for console output only.
  //const browser = await firefox.launch();
    // Launch a visible Firefox browser.
    const browser = await firefox.launch({ headless: false });
  // Create new context & a new page.
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Path to load the local html file.
    await page.goto('file:///Users/alanna/Coding/Web Development/VirtualPetOnline/index.html');

    // A delay of 3 seconds to observe page loading.
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create test input for the textbox
    await page.fill('#pet-name-input', 'Fluffy')
    // Click submit button
    await page.click('#submit-name');

    // Delay of 3 seconds to observe the result of the click action.
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Pet name submitted successfully');
    
  // Error handling  
  } catch (error) {
    console.log('An error occured:', error);
  } finally {
    // Close browser
    await browser.close();
  }
}

// Call the function to execute test
testSubmitPetName();