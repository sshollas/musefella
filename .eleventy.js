const { DateTime } = require("luxon");

function toDateTime(value) {
  if (value instanceof Date) {
    return DateTime.fromJSDate(value);
  }
  if (typeof value === "string") {
    const jsDate = new Date(value);
    if (!Number.isNaN(jsDate.getTime())) {
      return DateTime.fromJSDate(jsDate);
    }
  }
  return DateTime.invalid("Invalid date");
}

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
    toDateTime(date).setLocale("nb").toFormat("d. MMMM yyyy")
  );
  eleventyConfig.addFilter("isoDate", date =>
    toDateTime(date).toISODate()
  );
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk"
  };
};
