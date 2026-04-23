const puppeteer = require('puppeteer');

async function captureGreenhouseInterior() {
    const browser = await puppeteer.launch({
        headless: false, // Set to false for debugging, change to true for production
        defaultViewport: { width: 1280, height: 800 }
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to http://localhost:8765/index.html...');
        await page.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });

        console.log('Clicking startBtn to enter...');
        await page.click('#startBtn');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for game to initialize

        console.log('Holding W for 6 seconds to move forward...');
        await page.keyboard.down('w');
        await new Promise(resolve => setTimeout(resolve, 6000));
        await page.keyboard.up('w');

        console.log('Holding A for 2 seconds to strafe left...');
        await page.keyboard.down('a');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.keyboard.up('a');

        console.log('Holding W for 2 more seconds to enter greenhouse...');
        await page.keyboard.down('w');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.keyboard.up('w');

        // Wait a moment for any animations to settle
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Taking screenshot...');
        await page.screenshot({
            path: '/tmp/inside-greenhouse.png',
            fullPage: false // Capture viewport only
        });

        console.log('Screenshot saved to /tmp/inside-greenhouse.png');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

captureGreenhouseInterior();