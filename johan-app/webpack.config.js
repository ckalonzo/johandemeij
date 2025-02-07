module.exports = {
    module: {
        rules: [
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
            exclude: [
              /node_modules\/@sheerun\/mutationobserver-shim/,
              /node_modules\/@testing-library\/react/,
              /node_modules\/dom-accessibility-api/,
            ],
          },
        ],
      },
    devtool: false, // Disable source maps
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/"),
      },
    },
    ignoreWarnings: [
        {
            module: /node_modules\/@sheerun\/mutationobserver-shim/,
        },
        {
          module: /node_modules\/@testing-library\/react/,
        },
        {
          module: /node_modules\/dom-accessibility-api/,
        },
      ],
  };
  