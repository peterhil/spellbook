module.exports = function (api) {
  const isProd = api.cache(() => process.env.NODE_ENV === "production");

  const presets = [
    "@babel/preset-env"
  ];

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

  return {
    presets,
    plugins
  };
}
