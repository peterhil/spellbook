// Ava config
// https://github.com/avajs/ava#configuration

export default ({projectDir}) => {
	return {
    "cache": true,
    "concurrency": 8,
    "files": [
      "./test/**/*.spec.js",
      "./test/**/*.test.js",
    ],
    "sources": [
      "!dist/**/*",
      "**/*.{js,tag}",
      "*.config.js",
      "package.json",
    ],
    "require": [
      "buble-register",
      "./test/utils/browser-env",
      "./test/utils/node-extensions",
    ]
  }
}
