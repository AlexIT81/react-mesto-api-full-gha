function Footer() {
  const date = new Date().getFullYear()

  return (
    <footer className="footer root__footer">
      <p className="footer__text">&copy; {date} Mesto Russia</p>
    </footer>
  )
}

export default Footer;