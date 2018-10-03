const path = require('path')
const Encore = require('@symfony/webpack-encore')

Encore
// directory where compiled assets will be stored
 .setOutputPath('public/client/build/')
 // public path used by the web server to access the output path
 .setPublicPath('/build')


 // will create public/build/app.js and public/build/app.css
 .addEntry('app', `./src/client/index.js`)
 .enableReactPreset()
 .configureBabel(function (babelConfig) {
   babelConfig.presets.push('stage-3')
 })
 // enable source maps during development
 .enableSourceMaps(!Encore.isProduction())

 // empty the outputPath dir before each build
 .cleanupOutputBeforeBuild()

const config = Encore.getWebpackConfig()

config.resolve.alias = {
 'components': path.resolve(`${__dirname}/components`),
 '_redux': path.resolve(`${__dirname}/redux`),
}

config.watchOptions = {
 poll: true
}

// export the final configuration
module.exports = config
