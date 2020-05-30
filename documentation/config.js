const {readFileSync} = require("fs");
const wcTabPanelLessPath = "./documentation/theme/less/wc-tab-panel";
const wcTabPanelJsPath = "./documentation/theme/js/wc-tab-panel";

const templateData =
{
  site: {
    title: "Generic web components",
  },
  wcTabPanel: {
    css: {
      cba: readFileSync(`${wcTabPanelLessPath}/_cba.less`),
      pm: readFileSync(`${wcTabPanelLessPath}/_pm.less`)
    },
    js: {
      cba: readFileSync(`${wcTabPanelJsPath}/_cba.js`),
      pm: readFileSync(`${wcTabPanelJsPath}/_pm.js`)
    }
  }
};

module.exports = {templateData};
