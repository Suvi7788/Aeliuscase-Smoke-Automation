module.exports = {
    dashboard: '/dashboard',
    eventList: '/dashboard/list-event/1',
    caseEventList: (caseId) => `/dashboard/case-overview/${caseId}?tab=4`,
    caseDashboard: (caseId) => `/dashboard/case-overview/${caseId}`,
    caseList: (caseType) => `dashboard/recent-cases?type=${caseType}`,
    taskList: '/dashboard/list-task/20',
    caseTaskList: (caseId) => `/dashboard/case-overview/${caseId}?tab=5`,
    MessageList: '/dashboard/phone-call-messages/0',
};