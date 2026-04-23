const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for production
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport to 1280x800
  await page.setViewport({ width: 1280, height: 800 });

  // Capture console messages and errors
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    console.log(`Console ${msg.type()}: ${msg.text()}`);
  });

  page.on('pageerror', error => {
    consoleMessages.push(`Page Error: ${error.message}`);
    console.log(`Page Error: ${error.message}`);
  });

  try {
    console.log('Navigating to http://localhost:8765/index.html...');
    await page.goto('http://localhost:8765/index.html', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('Waiting 3 seconds for page to load...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Clicking "Enter the Nursery" button...');
    await page.click('#startBtn');

    console.log('Waiting 2 seconds after button click...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Pressing W key for 3 seconds to walk forward...');
    await page.keyboard.down('w');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.keyboard.up('w');

    console.log('Taking first screenshot...');
    await page.screenshot({ path: '/tmp/greenhouse-walk.png', fullPage: false });

    console.log('Pressing W key for another 2 seconds...');
    await page.keyboard.down('w');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.keyboard.up('w');

    console.log('Taking second screenshot...');
    await page.screenshot({ path: '/tmp/greenhouse-walk2.png', fullPage: false });

    console.log('Looking to the left by modifying camera rotation...');
    // Try to access controls globally first, fallback to mouse movement
    try {
      await page.evaluate(() => {
        if (window.controls && window.controls.getObject) {
          window.controls.getObject().rotation.y += 0.5;
        } else if (window.camera) {
          window.camera.rotation.y += 0.5;
        } else {
          // Fallback: simulate mouse movement for looking left
          const canvas = document.querySelector('canvas');
          if (canvas) {
            const event = new MouseEvent('mousemove', {
              clientX: canvas.width / 2 - 200,
              clientY: canvas.height / 2,
              movementX: -200,
              movementY: 0
            });
            canvas.dispatchEvent(event);
          }
        }
      });
    } catch (evalError) {
      console.log('Camera rotation failed, trying mouse movement...');
      // Alternative: simulate mouse movement
      await page.mouse.move(640, 400);
      await page.mouse.move(440, 400, { steps: 10 });
    }

    console.log('Taking final screenshot...');
    await page.screenshot({ path: '/tmp/greenhouse-inside.png', fullPage: false });

    console.log('\n=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => console.log(msg));

  } catch (error) {
    console.error('Script error:', error.message);
    consoleMessages.push(`Script Error: ${error.message}`);
  } finally {
    await browser.close();
  }
})();