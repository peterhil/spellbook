module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-sass-guidelines',
        'stylelint-config-rational-order',
    ],
    rules: {
        indentation: 4,
        'order/properties-alphabetical-order': [
		    null,
		    { 'disableFix': false }
        ]
    },
}
