const config_sitemap = {
  siteUrl: `https://localhost:3000`,
  generateRobotsTxt: true, // opcional
  priority: null,
  changefreq: null,
  exclude: ['/server-sitemap.xml', '/post/*'],
  robotsTxtOptions: {
    additionalSitemaps: [`https://localhost:3000/server-sitemap.xml`]
  }
}
module.exports = config_sitemap
