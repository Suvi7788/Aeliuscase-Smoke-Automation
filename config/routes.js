module.exports = {
    dashboard: '/dashboard',
    eventList: '/dashboard/list-event/1',
    caseEventList: (caseId) => `/dashboard/case-overview/${caseId}?tab=4`,
    caseEventTile: (caseId) => `/dashboard/case-overview${caseId}`,
    caseList: (caseType) => `dashboard/recent-cases?type=${caseType}`,
    MessageList: '/dashboard/phone-call-messages/0',
};