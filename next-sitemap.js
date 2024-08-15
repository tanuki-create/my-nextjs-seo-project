/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://keibi.org',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000, // サイトマップの最大URL数
  changefreq: 'daily', // 更新頻度
  priority: 0.7, // 優先度
  exclude: ['/admin/*', '/login'], // 除外するパス
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://keibi.org'}/my-custom-sitemap-1.xml`,
      `${process.env.SITE_URL || 'https://keibi.org'}/my-custom-sitemap-2.xml`,
    ],
  },
  // ...other options
}