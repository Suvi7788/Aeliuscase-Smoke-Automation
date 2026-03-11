const { expect } = require("@playwright/test");

class CaseTabs {
  constructor(page) {
    this.page = page;
    this.injuryDetails = page.getByText('Injury Details', { exact: true });

    // Tabs
    this.tabs = {
      calendar: page.getByRole('tab', { name: 'Calendar' }),
      tasks: page.getByRole('tab', { name: 'Tasks' }),
      notes: page.getByRole('tab', { name: 'Notes' }),
      parties: page.getByRole('tab', { name: 'Parties' }),
      injury: page.getByRole('tab', { name: 'Injury' }),
      documents: page.getByRole('tab', { name: 'Docs' }),
      activity: page.getByRole('tab', { name: 'Activity' }),
      calendar: page.getByRole('tab', { name: 'Calendar' }),
      textMessage: page.getByRole('tab', { name: 'Text Message' }),
      letters: page.getByRole('tab', { name: 'Letters' }),
      medIndex: page.getByRole('tab', {name:'Med Index'}),
      legalForms: page.getByRole('tab', { name: 'Legal Forms' })
    };

    // Section validators
    this.sections = {
      notes: page.getByRole('textbox', { name: 'Search Notes' }),
      documents: page.getByRole('textbox', { name: 'Search Documents' }),
      calendar: page.getByText('Calendar View', { exact: true }),
      activity: page.getByRole('textbox', { name: 'Search Activity' }),
      letters: page.getByRole('textbox', { name: 'Search Letters' }),
      tasks: page.getByRole('button', { name: 'Deleted Task' }),
      calendar: page.getByText('Calendar View', { exact: true }),
      settlement: page.getByRole('button', { name: 'PD Ratings' }),
    };

    // Route indicators
    this.routes = {
      notes: 'tab=2',
      documents: 'tab=3',
      calendar: 'tab=4',
      activity: 'tab=7',
      letters: 'tab=10',
      textMessage: 'tab=12',
      medIndex: 'tab=11',
      legalForms: 'tab=9'
    };
  }

  async open(tabName) {
    await this.tabs[tabName].click();
  }

  async verifyTabLoaded(tabName) {
    await expect(this.sections[tabName]).toBeVisible();
    // await expect(this.page.url()).toContain(this.routes[tabName]);
  }

  async verifyInjuryTabLoaded() {
    await expect(this.injuryDetails).toBeVisible();
  }
}

module.exports = { CaseTabs };
