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
