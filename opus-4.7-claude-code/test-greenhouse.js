const puppeteer = require('puppeteer');

async function testGreenhouse() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Capture console messages
    const consoleMessages = [];
    page.on('console', msg => {
        consoleMessages.push({
            type: msg.type(),
            text: msg.text(),
            location: msg.location()
        });
    });

    // Capture uncaught exceptions
    const exceptions = [];
    page.on('pageerror', error => {
        exceptions.push({
            message: error.message,
            stack: error.stack
        });
    });

    try {
        console.log('Loading page...');
        await page.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });

        console.log('Taking overlay screenshot...');
        await page.screenshot({ path: '/tmp/greenhouse-overlay.png' });

        console.log('Waiting 3 seconds for Three.js initialization...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Looking for start button...');
        const startBtn = await page.$('#startBtn');
        if (startBtn) {
            console.log('Clicking start button...');
            await startBtn.click();
        } else {
            console.log('Start button not found!');
        }

        console.log('Waiting 2 seconds after button click...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Taking main screenshot...');
        await page.screenshot({ path: '/tmp/greenhouse-screenshot.png' });

        console.log('\n=== CONSOLE MESSAGES ===');
        consoleMessages.forEach(msg => {
            console.log(`[${msg.type.toUpperCase()}] ${msg.text}`);
            if (msg.location && msg.location.url) {
                console.log(`    at ${msg.location.url}:${msg.location.lineNumber}`);
            }
        });

        console.log('\n=== EXCEPTIONS ===');
        exceptions.forEach(exc => {
            console.log(`Error: ${exc.message}`);
            if (exc.stack) {
                console.log(exc.stack);
            }
        });

    } catch (error) {
        console.error('Script error:', error);
    } finally {
        await browser.close();
    }
}

testGreenhouse().then(() => {
    console.log('\nTest completed.');
}).catch(console.error);