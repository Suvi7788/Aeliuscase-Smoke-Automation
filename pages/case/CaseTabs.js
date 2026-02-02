const { expect } = require("@playwright/test");

class CaseTabs {
  constructor(page) {
    this.page = page;

    // Tabs
    this.tabs = {
      calendar: page.getByRole('tab', { name: 'Calendar' }),
      tasks: page.getByRole('tab', { name: 'Tasks' }),
      notes: page.getByRole('tab', { name: 'Notes' }),
      parties: page.getByRole('tab', { name: 'Parties' }),
      injury: page.getByRole('tab', { name: 'Injury' }),
      documents: page.getByRole('tab', { name: 'Docs' }),
      activity: page.getByRole('tab', { name: 'Activity' }),
    };

    // Section validators
    this.sections = {
      notes: page.getByRole('textbox', { name: 'Search Notes' }),
      documents: page.getByRole('textbox', { name: 'Search Documents' }),
      calendar: page.getByText('Calendar View', { exact: true }),
      activity: page.getByRole('textbox', { name: 'Search Activity' }),
      letters: page.getByRole('textbox', { name: 'Search Letters' }),
    };

    // Route indicators
    this.routes = {
      notes: 'tab=2',
      documents: 'tab=3',
      calendar: 'tab=4',
      activity: 'tab=7',
      letters: 'tab=10',
    };
  }

  async open(tabName) {
    await this.tabs[tabName].click();
  }

  async verifyTabLoaded(tabName) {
    await expect(this.sections[tabName]).toBeVisible();
    await expect(this.page.url()).toContain(this.routes[tabName]);
  }
}

module.exports = { CaseTabs };
