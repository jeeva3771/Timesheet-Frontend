import { Helmet } from 'react-helmet'
const PageMetaData = ({ title }) => {
	return (
		<Helmet>
			<title>{title} | Time Sheet</title>
		</Helmet>
	)
}
export default PageMetaData
