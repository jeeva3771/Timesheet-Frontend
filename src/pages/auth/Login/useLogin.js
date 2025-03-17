import { HttpClient } from '@/common'
import { useAuthContext } from '@/context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
export default function useLogin() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { isAuthenticated, saveSession } = useAuthContext()
	const schemaResolver = yup.object().shape({
		email: yup
			.string()
			.email('Please enter a valid email')
			.required('Please enter Username'),
		password: yup.string().required('Please enter Password'),
	})
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(schemaResolver),
		defaultValues: {
			email: 'jeeva@gmail.com',
			password: 'test',
		},
	})
	// const redirectUrl = useMemo(() => (location.state?.from.pathname, location.pathname ?? "/"), [location.state]);
	const redirectUrl = searchParams.get('next') ?? '/dashboard/'
	const login = handleSubmit(async function (values) {
		setLoading(true)
		try {
			const res = await HttpClient.post('/login', values)
			if (res.data.token) {
				saveSession({
					...(res.data ?? {}),
					token: res.data.token,
				})
				toast.success('Successfully logged in. Redirecting....', {
					position: 'top-right',
					duration: 2000,
				})
				navigate(redirectUrl)
			}
		} catch (e) {
			if (e.response?.data?.error) {
				toast.error(e.response?.data?.error, {
					position: 'top-right',
					duration: 2000,
				})
			}
		} finally {
			setLoading(false)
		}
	})
	return {
		loading,
		login,
		redirectUrl,
		isAuthenticated,
		control,
	}
}
