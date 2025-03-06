const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			© {new Date().getFullYear()} Metrica{' '}
			<span className="text-muted d-none d-sm-inline-block float-end">
				Crafted with <i className="mdi mdi-heart text-danger" /> by Mannatthemes
			</span>
		</footer>
	)
}
export default Footer
