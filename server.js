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
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
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
