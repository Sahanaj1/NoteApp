import "./footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <a href="https://instagram.com"><i className="social-icon fa-brands fa-github"></i></a>
      <a href="mailto:sahanajoshi07@gmail.com"><i className="social-icon fa-solid fa-envelope"></i></a>
      <a href="https://www.linkedin.com/in/sahana-joshii/"><i class="social-icon fa-brands fa-linkedin"></i></a>
    
      <p>© Copyright {new Date().getFullYear()}</p>

    </footer>
  );
}