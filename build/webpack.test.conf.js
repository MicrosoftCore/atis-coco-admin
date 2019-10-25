'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const prodWebpackConfig = require('./webpack.prod.conf')

const env = require('../config/test.env')

/**
 * @description Output contains only single HotModuleReplacementPlugin now.
 * @example merge.unique(<field>, <fields>, field => field)
 * @see (e.g. https://www.npmjs.com/package/webpack-merge).
 */
const customizeMerge = merge({
  customizeArray: merge.unique(
    'plugins',
    ['DefinePlugin']
  )
})
// merge({
//   customizeArray(a, b, key) {
//     if (key === 'extensions') {
//       return _.uniq([...a, ...b])
//     }

//     // Fall back to default merging
//     return undefined
//   }
// })

const webpackConfig = customizeMerge({
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}, prodWebpackConfig)

module.exports = webpackConfig
