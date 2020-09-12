export default {
  "cache": true,
  "concurrency": 8,
  "files": [
    "./test/**/*.spec.js",
    "./test/**/*.test.js",
  ],
  "ignoredByWatcher": [
    "!{dev,dist}/**/*",
    "*.config.js",
    "package.json",
  ],
  "require": [
    "./test/_setup.js",
  ],
}
