import { PageBreadcrumb } from '@/components'
import { Col, Row } from 'react-bootstrap'
import UsersChat from './components/UsersChat'
import ChatArea from './components/ChatArea'
import { useState } from 'react'
import { users } from './data'
const Chat = () => {
	const [selectedUser, setSelectedUser] = useState(users[1])
	/**
	 * On user change
	 */
	const onUserChange = (user) => {
		setSelectedUser(user)
	}
	return (
		<>
			<PageBreadcrumb title="Chat" subName="Projects" />

			<Row>
				<Col xs={12}>
					<UsersChat onUserSelect={onUserChange} />

					<ChatArea selectedUser={selectedUser} />
				</Col>
			</Row>
		</>
	)
}
export default Chat
