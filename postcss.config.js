// const purgecss = [
//     "@fullhuman/postcss-purgecss",
//     {
//       content: ["./components/**/*.js", "./pages/**/*.js"],
//       defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
//     }
//   ];
  module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss': {},
        // 'autoprefixer': {}
    },
    //  [
    //   require("postcss-import"),
    //   require("tailwindcss"),
    //   require("autoprefixer"),
    // //   ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
    // ]
  };