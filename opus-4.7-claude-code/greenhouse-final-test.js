const puppeteer = require('puppeteer');

async function finalGreenhouseTest() {
    const browser = await puppeteer.launch({
        headless: false,
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

        // Wait for Three.js scene to fully load
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('3. Walking forward by holding W for 4 seconds');
        await page.keyboard.down('w');
        await new Promise(resolve => setTimeout(resolve, 4000));
        await page.keyboard.up('w');

        // Check interact-tip before clicking
        const preClickTip = await page.evaluate(() => {
            const tip = document.getElementById('interact-tip');
            return {
                display: tip ? getComputedStyle(tip).display : 'no tip',
                text: tip ? tip.textContent : 'no tip'
            };
        });
        console.log('Interact tip before click:', preClickTip);

        console.log('4. Clicking in the center of the screen (crosshair position)');
        const viewport = page.viewport();
        const centerX = viewport.width / 2;
        const centerY = viewport.height / 2;

        // Click and wait a bit longer for popup animation
        await page.mouse.click(centerX, centerY);
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('5. Taking screenshot');
        await page.screenshot({ path: '/tmp/greenhouse-interact.png' });

        console.log('6. Checking popup display style');
        const finalState = await page.evaluate(() => {
            const popup = document.getElementById('popup');
            const h3 = popup?.querySelector('h3');
            const p = popup?.querySelector('p');

            return {
                popupDisplay: popup ? getComputedStyle(popup).display : 'no popup',
                popupVisibility: popup ? getComputedStyle(popup).visibility : 'no popup',
                popupOpacity: popup ? getComputedStyle(popup).opacity : 'no popup',
                h3Text: h3 ? h3.textContent.trim() : 'no h3 or empty',
                pText: p ? p.textContent.trim() : 'no p or empty',
                h3InnerHTML: h3 ? h3.innerHTML : 'no h3',
                pInnerHTML: p ? p.innerHTML : 'no p'
            };
        });

        console.log('\n=== FINAL RESULTS ===');
        console.log(`Popup display style: ${finalState.popupDisplay}`);
        console.log(`Popup visibility: ${finalState.popupVisibility}`);
        console.log(`Popup opacity: ${finalState.popupOpacity}`);
        console.log(`H3 text content: "${finalState.h3Text}"`);
        console.log(`P text content: "${finalState.pText}"`);
        console.log(`H3 innerHTML: "${finalState.h3InnerHTML}"`);
        console.log(`P innerHTML: "${finalState.pInnerHTML}"`);

        return finalState;

    } catch (error) {
        console.error('Error during test:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

finalGreenhouseTest()
    .then(results => {
        console.log('\nTest completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('Test failed:', error);
        process.exit(1);
    });