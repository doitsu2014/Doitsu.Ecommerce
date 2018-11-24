const rewired = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const rewireEslint = require('react-app-rewire-eslint')
const path = require('path')

function rewire(config, env) {
  const cssLoader = rewired.getLoader(
    config.module.rules,
    rule => rule.test && String(rule.test) === String(/\.css$/)
  )
  const sassLoader = {
    test: /\.scss$/,
    use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
  }


  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
  oneOf.unshift(sassLoader)



  config = rewired.injectBabelPlugin('transform-decorators-legacy', config)
  config = rewireLess(config, env)
  config = rewireEslint(config, env)

  var oneOf2 = config.module.rules[1].oneOf;
  for(var i = 0; i < oneOf2.length; ++i) {
    var x = oneOf2[i];
    console.log("Loader Regexp: ", x.test)
    if(x.use)x.use.forEach(element => {
      console.log(element)
      if(element.options && element.options.plugins) console.log(element.options.plugins)
    });
  }
  
  
  config.resolve.modules.push(path.resolve(__dirname, '/src'))
  return config
}

module.exports = rewire
