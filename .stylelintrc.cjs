module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-sass-guidelines',
        'stylelint-config-rational-order',
    ],
    rules: {
        'max-nesting-depth': 2,
        'number-leading-zero': null,
        'order/properties-alphabetical-order': [null, { disableFix: false }],
        'selector-no-qualifying-type': null,
    },
}
