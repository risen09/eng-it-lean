<<<<<<< HEAD
<<<<<<< HEAD
const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "pr_2.main": "/pr_2",
  },
  features: {
    "pr_2": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "pr_2.api": "/api",
  },
};
=======
const pkg = require('./package');
=======
const pkg = require("./package");
>>>>>>> dev

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "eng-it-lean.main": "/eng-it-lean",
    "eng-it-lean.dictionary": "/eng-it-lean/dictionary/:id",
  },
  features: {
    sandbox: {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "eng-it-lean.api": "/api",
  },
};
>>>>>>> main
