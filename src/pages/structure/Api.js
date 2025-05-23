const apiUrl = import.meta.env.VITE_API_URL
var headers = new Headers()
headers.append("Content-Type", "application/json")

export async function  authentication(email, password) {
    try {
        const raw = JSON.stringify({
            "emailId": email,
            "password": password
        })

        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers,
            body: raw
        }

        const response = await fetch(`${apiUrl}/api/login/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function logout() {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/timesheets/`, requestOptions)

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}


export async function readUsersCount(isManager = false, isActive = false) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let queryParams = []
        if (isManager) queryParams.push('manager=true')
        if (isActive) queryParams.push('active=true')
        
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

        const response = await fetch(`${apiUrl}/api/counts/users${queryString}`, requestOptions)

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readProjectsCount(isCompleted = false) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/counts/projects/${isCompleted ? '?completed=true' : ''}`, requestOptions)

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readUsers(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${apiUrl}/api/users/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readUserById(userId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/${userId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readUserMainDetailsById() {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/maininfo/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}


export async function readUserNameAndRole(adminAndManager = false, projectId = '', deleted = false) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }
        let params = [];
        if(adminAndManager) params.push('adminAndManager=true')
        if (projectId) params.push(`projectId=${projectId}`)
        if (deleted) params.push('deleted=true')

        let url = `${apiUrl}/api/users/nameandrole${params.length ? '?' + params.join('&') : ''}`

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


export async function saveOrUpdateUser(userId, payload) {
    const method = userId ? "PUT" : "POST"
    let requestBody
    let headers = {}

    if (payload.image) {
        const formData = new FormData()
        formData.append("name", payload.name)
        formData.append("dob", payload.dob)
        formData.append("role", payload.role)
        formData.append("status", payload.status)
        formData.append("emailId", payload.email)
        formData.append("password", payload.password)

        if (payload.image) {
            formData.append("image", payload.image)
        }
        requestBody = formData
    } else {
        headers = { "Content-Type": "application/json" }
        const updatePayload = {
            name: payload.name,
            dob: payload.dob,
            role: payload.role,
            status: payload.status,
            emailId: payload.email,
            password: payload.password,
            removeImage: payload.removeImage
        }
        requestBody = JSON.stringify(updatePayload)
    }

    try {
        const requestOptions = {
            method,
            body: requestBody,
            headers: payload.image ? undefined : headers,
            credentials: "include",
        };

        const response = await fetch(
            `${apiUrl}/api/users${userId ? `/${userId}/` : "/"}`,
            requestOptions
        )

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: "Something went wrong. Please try again later.",
        }
    }
}

export async function updateUserProfileInfo(payload) {
    try {        
        const requestOptions = {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/profileinfo/`, requestOptions);
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


export async function deleteUserById(userId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${apiUrl}/api/users/${userId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readProjects(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        
        // Create base URL
        let baseUrl = `${apiUrl}/api/projects/`
        
        // Build query parameters array
        let queryParams = []
        
        // Only add parameters if they exist and are valid
        if (limit !== undefined && limit !== null) {
            queryParams.push(`limit=${limit}`)
        }
        
        if (pageNo !== undefined && pageNo !== null) {
            queryParams.push(`page=${pageNo}`)
        }
        
        if (sortColumn) {
            queryParams.push(`orderby=${sortColumn}`)
        }
        
        if (sortOrder) {
            queryParams.push(`sort=${sortOrder}`)
        }
        
        if (searchText && searchText.trim()) {
            queryParams.push(`search=${searchText.trim()}`)
        }
        
        // Add query string to URL if there are any parameters
        const url = queryParams.length > 0 
            ? `${baseUrl}?${queryParams.join('&')}` 
            : baseUrl
            
        const response = await fetch(url, requestOptions)

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readProjectById(projectId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/projects/${projectId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateProject(projectId, payload) {
    try {
   
        const requestOptions = {
            method: projectId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/projects${projectId ? `/${projectId}/` : "/"}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readProjectHistory() {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/projects/history`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function deleteProjectById(projectId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${apiUrl}/api/projects/${projectId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readProjectName(hr = false, employee = false, inProgress = false, userId, deleted = false, condition = false) {
    try {
        const queryParams = new URLSearchParams()

        if (hr) queryParams.append('hr', 'true')
        if (employee) queryParams.append('employee', 'true')
        if (inProgress) queryParams.append('inProgress', 'true')
        if (userId) queryParams.append('userId', userId)
        if (deleted) queryParams.append('deleted', 'true')
        if (condition) queryParams.append('condition', 'true')
    
        const queryString = queryParams.toString()    
        const response = await fetch(`${apiUrl}/api/projects/name/${queryString ? `?${queryString}` : ''}`, {
          method: 'GET',
          headers: new Headers(),
          credentials: 'include',
        })
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}


export async function readTimesheets(orderby, sort, fromDate, toDate, userId, projectId) {  
    try {
        const queryParams = new URLSearchParams({
            orderby,
            sort
        })
      
        if (fromDate) queryParams.append('fromDate', fromDate)
        if (toDate) queryParams.append('toDate', toDate)
        if (userId) queryParams.append('userId', userId)
        if (projectId) queryParams.append('projectId', projectId)
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${apiUrl}/api/timesheets/?${queryParams.toString()}`
        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


export async function readTimeSheetDocumentById(timesheetId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/timesheets/documentimage/${timesheetId}/?t=${Date.now()}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readTimeSheetById(timesheetId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/timesheets/${timesheetId}`, requestOptions)

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveTimeSheet(formData) {
    try {        
        const requestOptions = {
            method: "POST",
            body: formData,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/timesheets/`, requestOptions);
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


export async function updateTimeSheet(timesheetId, payload) {
    try {        
        const requestOptions = {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/timesheets/${timesheetId}`, requestOptions);
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


export async function readTimeSheetHistory() {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/timesheets/history`, requestOptions)

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function changePassword(payload) {
    try {        
        const requestOptions = {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/changepassword/`, requestOptions);
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function updateImageByUser(formData) {
    try {        
        const requestOptions = {
            method: "PUT",
            body: formData,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/editavatar/?t=${Date.now()}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function generateOtp(emailId) {
    try {        
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(emailId),
            headers,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/generateotp/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function resetPassword(payload) {
    try {        
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(payload),
            headers,
            credentials: 'include'
        }

        const response = await fetch(`${apiUrl}/api/users/resetpassword/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteUserImageById() {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${apiUrl}/api/users/deleteavatar/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


 


















