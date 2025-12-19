const { CaseTabs } = require('./sections/CaseTabs');

class CaseOverviewPage {
  constructor(page) {
    this.page = page;

    this.caseTabs = new CaseTabs(page);
  }

 
}

module.exports = { CaseOverviewPage };