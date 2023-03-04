const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const cron = require('node-cron');

const filePath = path.join(__dirname, 'index.html');

cron.schedule('0 * * * *', () => {

    fetch('https://api.eylexander.xyz/?get=image')
        .then(res => res.json())
        .then(json => {
            const newImageURL = json.url;

            if(newImageURL.includes(' ')) { newImageURL = newImageURL.replace(' ', '%20'); }

            fs.readFile(filePath, 'utf8', (err, html) => {
                if (err) {
                    console.error(err);
                    return;
                }
              
                const $ = cheerio.load(html);
                const meta1 = $('meta[name="twitter:image:src"]');
                const meta2 = $('meta[property="og:image"]');
                if (meta1 && meta2) {
                    meta1.attr('content', newImageURL);
                    meta2.attr('content', newImageURL);
                    fs.writeFile(filePath, $.html(), (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`Updated ${meta1.attr('name')} and ${meta2.attr('name')} to ${newImageURL}`);
                        }
                    });
                }
            });
        })
        .catch(err => console.error(err));

});
