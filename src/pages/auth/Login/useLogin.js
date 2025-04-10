// import { HttpClient } from '@/common'
// import { useAuthContext } from '@/context'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import * as yup from 'yup'
// export default function useLogin() {
// 	const [loading, setLoading] = useState(false)
// 	const navigate = useNavigate()
// 	const [searchParams] = useSearchParams()
// 	const { isAuthenticated, saveUserLogged } = useAuthContext()
// 	const schemaResolver = yup.object().shape({
// 		email: yup
// 			.string()
// 			.email('Please enter a valid email')
// 			.required('Please enter Username'),
// 		password: yup.string().required('Please enter Password'),
// 	})
// 	const { control, handleSubmit } = useForm({
// 		resolver: yupResolver(schemaResolver),
// 		defaultValues: {
// 			email: 'jeeva@gmail.com',
// 			password: 'test',
// 		},
// 	})
// 	// const redirectUrl = useMemo(() => (location.state?.from.pathname, location.pathname ?? "/"), [location.state]);
// 	const redirectUrl = searchParams.get('next') ?? '/dashboard/'
// 	const login = handleSubmit(async function (values) {
// 		setLoading(true)
// 		try {
// 			const res = await HttpClient.post('/login', values)
// 			if (res.data.token) {
// 				saveUserLogged({
// 					...(res.data ?? {}),
// 					token: res.data.token,
// 				})
// 				toast.success('Successfully logged in. Redirecting....', {
// 					position: 'top-right',
// 					duration: 2000,
// 				})
// 				navigate(redirectUrl)
// 			}
// 		} catch (e) {
// 			if (e.response?.data?.error) {
// 				toast.error(e.response?.data?.error, {
// 					position: 'top-right',
// 					duration: 2000,
// 				})
// 			}
// 		} finally {
// 			setLoading(false)
// 		}
// 	})
// 	return {
// 		loading,
// 		login,
// 		redirectUrl,
// 		isAuthenticated,
// 		control,
// 	}
// }
 

import { HttpClient } from '@/common'
import { useAuthContext } from '@/context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'

var headers = new Headers()
headers.append("Content-Type", "application/json")
export default function useLogin() {
	const apiUrl = import.meta.env.VITE_API_URL
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { saveUserLogged } = useAuthContext()
	const schemaResolver = yup.object().shape({
		email: yup
			.string()
			.email('Please enter a valid email')
			.required('Please enter Username'),
		password: yup.string().required('Please enter Password'),
	})
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(schemaResolver)
	})

	// const redirectUrl = searchParams.get('next') ?? '/dashboard/'
	// alert(searchParams.get('next'))
	const login = handleSubmit(async function (values) {
		setLoading(true)
	
		try {
			const raw = JSON.stringify({
				emailId: values.email,
				password: values.password,
			})
	
			const requestOptions = {
				method: 'POST',
				credentials: 'include',
				headers,
				body: raw,
			}
	
			const response = await fetch(`${apiUrl}/api/login/`, requestOptions)
			const user = await response.json()
	
			if (response.status === 400) {
				toast.error(user, {
					position: 'top-right',
					duration: 2000,
				})
				return 
			}
	
			if (response.status === 200) {
				saveUserLogged(user)
	
				toast.success('Successfully logged in....', {
					position: 'top-right',
					duration: 2000,
				})
				const role = user?.role
				if (role === 'admin' || role === 'manager') {
					navigate('/dashboard/')
				} else if (role === 'employee' || role === 'hr') {
					navigate('/timereport/')
				} else {
					navigate('/') 
				}
				return
			}

			throw new Error(user)
		} catch (e) {
			toast.error('Something went wrong. Please try again later.', {
				position: 'top-right',
				duration: 2000,
			})
		} finally {
			setLoading(false)
		}
	})
	
	return {
		loading,
		login,
		control,
	}
}
 