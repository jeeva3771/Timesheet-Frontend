const apiUrl = import.meta.env.VITE_API_URL
var headers = new Headers()
headers.append("Content-Type", "application/json")

// export async function  authentication(email, password) {
//     try {
//         const raw = JSON.stringify({
//             "emailId": email,
//             "password": password
//         })

//         const requestOptions = {
//             method: "POST",
//             credentials: 'include',
//             headers,
//             body: raw
//         }

//         const response = await fetch(`${appUrl}/api/login/`, requestOptions)
//         return {
//             response,
//             error: null,
//         }
//     } catch (error) {
//         return {
//             response: null,
//             error: 'Something went wrong. Please try again later.'
//         }
//     } 
// }

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

