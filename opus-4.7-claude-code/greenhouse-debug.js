const puppeteer = require('puppeteer');

async function debugGreenhouseDOM() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1280, height: 800 }
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });
        await page.waitForSelector('button', { timeout: 10000 });
        await page.click('button');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check DOM structure for popup-related elements
        const domInfo = await page.evaluate(() => {
            const popup = document.getElementById('popup');
            const allElements = document.querySelectorAll('*');
            const elementsWithId = Array.from(allElements).filter(el => el.id).map(el => ({ tag: el.tagName, id: el.id }));

            return {
                popupExists: !!popup,
                popupHTML: popup ? popup.outerHTML : null,
                allIds: elementsWithId,
                bodyHTML: document.body.innerHTML.substring(0, 500) // First 500 chars
            };
        });

        console.log('\n=== DOM DEBUG INFO ===');
        console.log(`Popup element exists: ${domInfo.popupExists}`);
        if (domInfo.popupExists) {
            console.log(`Popup HTML: ${domInfo.popupHTML}`);
        }
        console.log(`All elements with IDs:`, domInfo.allIds);
        console.log(`Body HTML (first 500 chars): ${domInfo.bodyHTML}`);

        // Now perform the walking and clicking
        await page.keyboard.down('w');
        await new Promise(resolve => setTimeout(resolve, 4000));
        await page.keyboard.up('w');

        const viewport = page.viewport();
        const centerX = viewport.width / 2;
        const centerY = viewport.height / 2;
        await page.mouse.click(centerX, centerY);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait longer

        // Check again after interaction
        const postClickInfo = await page.evaluate(() => {
            const popup = document.getElementById('popup');
            return {
                popupExists: !!popup,
                popupDisplay: popup ? getComputedStyle(popup).display : 'no popup',
                popupVisible: popup ? getComputedStyle(popup).visibility : 'no popup',
                popupOpacity: popup ? getComputedStyle(popup).opacity : 'no popup',
                h3Text: popup?.querySelector('h3')?.textContent || 'no h3',
                pText: popup?.querySelector('p')?.textContent || 'no p'
            };
        });

        console.log('\n=== POST-CLICK INFO ===');
        console.log(postClickInfo);

        await page.screenshot({ path: '/tmp/greenhouse-debug.png' });

        return postClickInfo;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

debugGreenhouseDOM()
    .then(results => {
        console.log('\nDebug completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('Debug failed:', error);
        process.exit(1);
    });