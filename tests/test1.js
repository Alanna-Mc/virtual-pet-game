/* A test using Playwright that ensures the textbox input for naming the pet is visible on the users browser */

//Import the 'firefox' module from the 'playwright' library.
const { firefox } = require('playwright');

// Define an asynchronous function to test naming element visibility.
async function testNamingElementVisibility() {
    // Launch a Firefox browser instance.
    const browser = await firefox.launch();
    // Create a new browsing context.
    const context = await browser.newContext();
    // Create a new page within the context.
    const page = await context.newPage();
  
    try {
      // Load the local HTML file by providing its path
      await page.goto('file:///Users/alanna/Coding/Web Development/VirtualPetOnline/index.html');

      // Find the naming element on the loaded page.
      const namingElement = await page.$('#pet-name-input');
      
      // Check if the naming element is visible.
      if (namingElement) {
        const isNamingElementVisible = await namingElement.isVisible();
        if (isNamingElementVisible) {
          console.log('Naming element is visible.');
        } else {
          console.error('Naming element is not visible.');
        }
      } else {
        console.error('Naming element not found.');
      }
    // Handle any errors that occur during the test.  
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      // Close the browser instance after the test.  
      await browser.close();
    }
  }
  
  // Call the test function to execute the test.
  testNamingElementVisibility();