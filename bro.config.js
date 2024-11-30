const pkg = require('./package');

module.exports = {
  apiPath: 'stubs/api',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`
    }
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    'eng-it-lean.main': '/eng-it-lean',
		'eng-it-lean.vocabulary': '/eng-it-lean/vocabulary'
  },
  features: {
    sandbox: {
      // add your features here in the format [featureName]: { value: string }
    }
  },
  config: {
    'eng-it-lean.api': '/api'
  }
};
