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
    'eng-it-lean.dictionary': '/eng-it-lean/dictionary/:id',
    'eng-it-lean.unit': '/eng-it-lean/unit/:id',
    'eng-it-lean.message': '/eng-it-lean/message',
    'eng-it-lean.entry': '/eng-it-lean/entry',
    'eng-it-lean.registration': '/eng-it-lean/registration',
    'eng-it-lean.account': '/eng-it-lean/account',
    'eng-it-lean.generate-unit': '/eng-it-lean/generate-unit',
    'eng-it-lean.units': '/eng-it-lean/units',
    'eng-it-lean.dictionaries': '/eng-it-lean/dictionaries',
    'eng-it-lean.edit-unit': '/eng-it-lean/edit-unit',
    'eng-it-lean.about': '/eng-it-lean/about'
  },
  features: {
    'eng-it-lean': {
      'unit.edit': true,
    }
  },
  config: {
    'eng-it-lean.api': '/api'
  }
};
