const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Collections
  eleventyConfig.addCollection("skadedyr", api =>
    api.getFilteredByGlob("src/skadedyr/*.njk").sort((a, b) =>
      (b.data.priority || 0) - (a.data.priority || 0)
    )
  );
  eleventyConfig.addCollection("guider", api =>
    api.getFilteredByGlob("src/guider/*.njk")
  );
  eleventyConfig.addCollection("produkter", api =>
    api.getFilteredByGlob("src/produkter/*.njk")
  );
  eleventyConfig.addCollection("kategorier", api =>
    api.getFilteredByGlob("src/kategorier/*.njk")
  );

  // Filters
  eleventyConfig.addFilter("readableDate", date =>
    DateTime.fromJSDate(date).setLocale("nb").toFormat("d. MMMM yyyy")
  );
  eleventyConfig.addFilter("isoDate", date =>
    DateTime.fromJSDate(date).toISO()
  );
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk"
  };
};
