const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/fetch-html', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
              executablePath: '/opt/render/.cache/puppeteer/chrome/linux-126.0.6478.61'// '/usr/bin/google-chrome-stable' // or the path where Chrome is installed
            });
        
        const page = await browser.newPage();        
        await page.goto(url, { waitUntil: 'domcontentloaded' });  
        const content = await page.content();
        await browser.close();
        res.send(content);
    } catch (error) {
        res.status(500).send(`Error fetching HTML: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
