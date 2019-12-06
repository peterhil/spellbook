{
  "extends": "standard",
  "rules": {
    "comma-dangle": [
      "off",
      "always"
    ],
    "no-console": [
      "off",
      "always"
    ]
  },
  "overrides": [
    {
      "files": [ "*.tag" ],
      "excludedFiles": [],
      "rules": {
        "indent": [
          "off",
          "always"
        ]
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedstrict": false
    }
  },
  "plugins": ["riot"]
}
