import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllArticleSlugs } from './src/lib/api.js';

async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: 'https://keibi.org' });

  const slugs = getAllArticleSlugs();
  slugs.forEach((slug) => {
    smStream.write({ url: `/articles/${slug}`, changefreq: 'daily', priority: 0.9 });
  });

  smStream.end();

  const sitemap = await streamToPromise(smStream).then((data) => data.toString());

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
}

generateSitemap();