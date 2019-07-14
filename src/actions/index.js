// OAuth
export const storeAccessToken = (access_token) => ({
    type: 'STORE_ACCESS_TOKEN',
    access_token
});

export const getUser = () => ({
    type: 'GET_USER'
});

export const getAssignments = () => ({
    type: 'GET_ASSIGNMENTS'
});

export const getAssignment = (assignment_id) => ({
    type: 'GET_ASSIGNMENT',
    assignment_id
});

export const startTest = (assignment_id) => ({
    type: 'START_TEST',
    assignment_id
});

export const submitInitial = (assignment_id) => ({
    type: 'SUBMIT_INITIAL',
    assignment_id
});

export const submitRevision = (assignment_id) => ({
    type: 'SUBMIT_REVISION',
    assignment_id
});

export const checkTest = (assignment_id, job_id) => ({
    type: 'CHECK_TEST',
    assignment_id,
    job_id
});

export const cancelTest = (job_id) => ({
    type: 'CANCEL_TEST',
    job_id
});

export const downloadFile = (assignment_id) => ({
    type: 'DOWNLOAD_FILE',
    assignment_id,
});

export const clearMessage = () => ({
    type: 'CLEAR_MESSAGE'
});

export const getStudents = () => ({
    type: 'GET_STUDENTS'
});

export const getStudent = (login) => ({
    type: 'GET_STUDENT',
    login
});

export const getStudentAssignment = (login, assignment_id) => ({
    type: 'GET_STUDENT_ASSIGNMENT',
    login,
    assignment_id
});

export const downloadStudentTest = (login, assignment_id) => ({
    type: 'DOWNLOAD_STUDENT_TEST',
    login, 
    assignment_id
})

export const downloadStudentInitial = (login, assignment_id) => ({
    type: 'DOWNLOAD_STUDENT_INITIAL',
    login, 
    assignment_id
})

export const downloadStudentRevision = (login, assignment_id) => ({
    type: 'DOWNLOAD_STUDENT_REVISION',
    login, 
    assignment_id
})