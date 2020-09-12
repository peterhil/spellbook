export default {
  "cache": true,
  "concurrency": 8,
  "files": [
    "./test/**/*.spec.js",
    "./test/**/*.test.js",
  ],
  "ignoredByWatcher": [
    "!{dev,dist}/**/*",
    "**/*.{js,svelte}",
    "*.config.js",
    "package.json",
  ],
  "require": [
    "./test/utils/browser-env",
    "./test/utils/node-extensions",
  ],
}
