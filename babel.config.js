module.exports = function (api) {
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ],
  ];

  var isProd = api.cache(() => process.env.NODE_ENV === "production");

  return { plugins };
}
