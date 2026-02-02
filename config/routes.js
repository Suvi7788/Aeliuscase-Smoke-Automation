module.exports = {
    dashboard: '/dashboard',
    eventList: '/dashboard/list-event/1',
    caseEventList: (caseId) => `/dashboard/case-overview/${caseId}?tab=4`,
    caseDashboard: (caseId) => `/dashboard/case-overview/${caseId}`,
    caseList: (caseType) => `dashboard/recent-cases?type=${caseType}`,
    taskList: '/dashboard/list-task/20',
    caseTaskList: (caseId) => `/dashboard/case-overview/${caseId}?tab=5`,
    caseNoteList: (caseId) => `/dashboard/case-overview/${caseId}?tab=2`,
    MessageList: '/dashboard/phone-call-messages/0',
    listUnassigned: '/dashboard/documents/list-unassigned',
    listBatchscan: '/dashboard/documents/list-extract/false',
};