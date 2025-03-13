import {
	ComponentContainerCard,
	FormTextInput,
	PageBreadcrumb,
	TextAreaInput,
} from '@/components'
import { splitArray } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Button,
	Col,
	Row,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
const faqData = [
	{
		id: 1,
		title: 'What is Timesheet?',
		content: 'A Timesheet is a tool or record used to track the amount of time an individual spends on various tasks, projects, or activities during a specific period (e.g., daily, weekly, or monthly).'
	},
	{
		id: 2,
		title: 'How can I access the system?',
		content: 'You can log in with your Admin, Manager, HR and Employee credentials, depending on your role.'
	},
	{
		id: 3,
		title: 'Who can access the attendance data?',
		content: 'Both the admin and the manager have the same access to Report data. There is no difference in their ability to manage report.'
	},
	{
		id: 4,
		title: 'Who can edit, delete, or add user information?',
		content: ' Only admins have the authority to edit, delete, or add user information. If you need access, please contact the system administrator.'
	},
	{
		id: 5,
		title: 'How do I contact support if I face technical issues?',
		content: 'If you encounter technical issues, please contact support by emailing support@example.com or calling +1-800-123-4567.'
	},
]

const faqForgot = [
	{
		id: 1,
		title: 'What should I do if I forget my login credentials?',
		content: 'If you forget your login credentials, use the "Forgot Password" option available on the login page. You will receive an OTP to reset your password.<br><b>Note:</b> After multiple failed attempts to log in, your account will be temporarily locked for 3 hours after you can try again.'
	},
	{
		id: 2,	
		title: 'Change or Reset Your Password',
		content: 'You can change your password anytime by visiting the "Change Password" section in your profile. If you forget your current password, use the "Forgot Password" link on the login page to reset it.'
	}
]
const FAQs1 = () => {
	const faqs = faqData || []
	const faqChunks = splitArray(faqs, 3)
	return (
		<ComponentContainerCard title="Basic Questions">
			<Row>
				{faqChunks.map((chunk, idx) => {
					return (
						<Col lg={6} key={idx}>
							<ul className="list-unstyled faq-qa">
								{chunk.map((item, idx) => {
									return (
										<li key={idx} className="mb-5">
											<h6>
												{item.id}. {item.title}
											</h6>
											<p className="font-14 text-muted ms-3">
												{item.content}
											</p>
										</li>
									)
								})}
							</ul>
						</Col>
					)
				})}
			</Row>
		</ComponentContainerCard>
	)
}
const FAQsAccordion = () => {
	return (
		<ComponentContainerCard title="Forgot Your Login Credentials?">
			<Accordion>
				{faqForgot.slice(0, 3).map((faq, idx) => {
					return (
						<AccordionItem eventKey={`${idx}`} key={idx}>
							<AccordionHeader as="h5" className="m-0">
								{faq.title}
							</AccordionHeader>
							<AccordionBody>
							<div dangerouslySetInnerHTML={{ __html: faq.content }} />
							</AccordionBody>
						</AccordionItem>
					)
				})}
			</Accordion>
		</ComponentContainerCard>
	)
}
const FAQsForm = () => {
	const faqFormSchema = yup.object({
		name: yup.string().required('Please enter name'),
		email: yup
			.string()
			.email('Please enter a valid email address')
			.required('Please enter email'),
		subject: yup.string().required('Please enter subject'),
		message: yup.string().required('Please enter message'),
	})
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(faqFormSchema),
	})
	return (
		<ComponentContainerCard
			title="Have More Questions"
			description="Don't Worry ! Email us your Questions or you can send us twitter."
		>
			<Row>
				<Col xs={12}>
					<form onSubmit={handleSubmit(() => {})}>
						<Row>
							<FormTextInput
								name="name"
								placeholder="Name"
								containerClass="col-lg-6 mb-2"
								control={control}
							/>
							<FormTextInput
								name="email"
								type="email"
								placeholder="Email"
								containerClass="col-lg-6 mb-2"
								control={control}
							/>
						</Row>
						<Row>
							<FormTextInput
								name="subject"
								placeholder="Subject"
								containerClass="col-12 mb-2"
								control={control}
							/>
						</Row>
						<TextAreaInput
							name="message"
							containerClass="mb-2"
							rows={4}
							placeholder="Your message"
							control={control}
						/>
						<Button variant="primary" type="submit" className="btn-block px-4">
							Send Email
						</Button>
					</form>
				</Col>
			</Row>
		</ComponentContainerCard>
	)
}
const FAQs = () => {
	return (
		<>
			<PageBreadcrumb subName="Pages" title="FAQ" />
			<Row>
				<Col xs={12}>
					<FAQs1 />
				</Col>
			</Row>
			<Row>
				<Col lg={6}>
					<FAQsAccordion />
				</Col>
				{/* <Col lg={6}>
					<FAQsForm />
				</Col> */}
			</Row>
		</>
	)
}
export default FAQs
