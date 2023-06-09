import { serverQueryContent } from '#content/server';
import { SitemapStream, streamToPromise } from 'sitemap';
import replace from 'buffer-replace';
import minimatch from 'minimatch';

// Exclusion patterns
const exclude = ['/authors**'];
// URLs to include
const include = ['https://recipes.gonzalohirsch.com', '/recipes/', '/search/'];
// Adding blog pages
const blogPageCount = 2;
for (let i = 1; i <= blogPageCount; i++) {
    include.push(`/recipes/page/${i}/`);
}
// Datemod
const datemod = new Date().toISOString().split('T')[0];

export default defineEventHandler(async (event) => {
    // Fetch all documents
    const docs = await serverQueryContent(event).find();
    const sitemap = new SitemapStream({
        hostname: 'https://recipes.gonzalohirsch.com',
        lastmodDateOnly: true
    });

    const inclusionMap = {};
    let excludeFromList;
    for (const doc of docs) {
        excludeFromList = false;
        // Verify if the URL matches any of the exclusion patterns
        exclude.forEach((pattern) => {
            if (minimatch(doc._path, pattern)) {
                excludeFromList = true;
            }
        });

        // Do not write if it's excluded
        if (!excludeFromList) {
            sitemap.write({
                url: (doc._path + '/').replace(/\/+$/, '/'),
                changefreq: 'daily',
                lastmod: datemod,
                priority: 1
            });
            // Verify if the url to include is already there or not
            include.forEach((url) => {
                if (url === (doc._path + '/').replace(/\/+$/, '/')) {
                    inclusionMap[url] = true;
                }
            });
        }
    }

    // Add all the urls specified in the include
    include.forEach((url) => {
        if (!inclusionMap[url]) {
            sitemap.write({
                url: url,
                changefreq: 'daily',
                lastmod: datemod,
                priority: 1
            });
        }
    });

    sitemap.end();

    return streamToPromise(sitemap).then((buffer) =>
        replace(buffer, '<loc>https://recipes.gonzalohirsch.com/</loc>', '<loc>https://recipes.gonzalohirsch.com</loc>')
    );
});
