const puppeteer = require('puppeteer');

async function testGreenhouseWalkthrough() {
    const browser = await puppeteer.launch({
        headless: false, // Set to true for production
        defaultViewport: { width: 1280, height: 800 }
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        console.log('1. Navigating to localhost:8765/index.html');
        await page.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });

        console.log('2. Clicking "Enter the Nursery" button');
        await page.waitForSelector('button', { timeout: 10000 });
        await page.click('button');

        // Wait a moment for the scene to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('3. Walking forward by holding W for 4 seconds');
        await page.keyboard.down('w');
        await new Promise(resolve => setTimeout(resolve, 4000));
        await page.keyboard.up('w');

        console.log('4. Clicking in the center of the screen');
        const viewport = page.viewport();
        const centerX = viewport.width / 2;
        const centerY = viewport.height / 2;
        await page.mouse.click(centerX, centerY);

        // Wait a moment for any popup to appear
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('5. Taking screenshot');
        await page.screenshot({ path: '/tmp/greenhouse-interact.png' });

        console.log('6. Checking popup display style');
        const popupDisplay = await page.evaluate(() => {
            const popup = document.getElementById('popup');
            return popup ? getComputedStyle(popup).display : 'element not found';
        });

        console.log('7. Reading popup content');
        const popupContent = await page.evaluate(() => {
            const h3Element = document.querySelector('#popup h3');
            const pElement = document.querySelector('#popup p');
            return {
                h3Text: h3Element ? h3Element.textContent : 'h3 not found',
                pText: pElement ? pElement.textContent : 'p not found'
            };
        });

        console.log('\n=== RESULTS ===');
        console.log(`Popup display style: ${popupDisplay}`);
        console.log(`Popup h3 text: ${popupContent.h3Text}`);
        console.log(`Popup p text: ${popupContent.pText}`);

        return {
            popupDisplay,
            popupContent,
            screenshotPath: '/tmp/greenhouse-interact.png'
        };

    } catch (error) {
        console.error('Error during test:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// Run the test
testGreenhouseWalkthrough()
    .then(results => {
        console.log('\nTest completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('Test failed:', error);
        process.exit(1);
    });