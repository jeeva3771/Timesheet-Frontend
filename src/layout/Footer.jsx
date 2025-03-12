const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			 Copyright © {new Date().getFullYear()}. All Rights Reserved.
			<span className="text-muted d-none d-sm-inline-block float-end">
				Crafted with <i className="mdi mdi-heart text-danger" /> by Mannatthemes
			</span>
		</footer>
	)
}
export default Footer
