import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h4>About CropNurture</h4>
          <p>CropNurture is an AI-powered platform dedicated to helping farmers detect and manage crop diseases efficiently. Our mission is to leverage technology to improve agricultural productivity and sustainability.</p>
        </div>
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/analyze">Crop Analysis</a></li>
            <li><a href="/alerts">Outbreak Alerts</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/pharmacists">Pharmacist Locator</a></li>
            <li><a href="/education">Education</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Contact Us</h4>
          <p>Email: support@cropnurture.com</p>
          <p>Phone: +91 8603744042</p>
          <p>Address: Yelahanka,Bangalore</p>
        </div>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <p className={styles.copy}>&copy; {new Date().getFullYear()} CropNurture. All rights reserved.</p>
    </footer>
  );
}
