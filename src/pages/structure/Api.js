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


export async function readUserNameAndRole(adminAndManager = false) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${apiUrl}/api/users/nameandrole/`
        if (adminAndManager) {
            url += '?adminAndManager=true'
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

export async function deleteUserById(userId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${apiUrl}/api/Users/${userId}/`, requestOptions)
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

        let url = `${apiUrl}/api/projects/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
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