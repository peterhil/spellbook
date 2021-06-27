module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-sass-guidelines',
        'stylelint-config-rational-order',
    ],
    rules: {
        indentation: 4,
        'number-leading-zero': null,
        'order/properties-alphabetical-order': [null, { disableFix: false }],
    },
}
