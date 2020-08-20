module.exports = {
  presets: [
    ['@vue/app', {
        polyfills: [
            'es6.promise',
            'es6.symbol'
        ]
    }]
  ],
  plugins: [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
  ]
}
