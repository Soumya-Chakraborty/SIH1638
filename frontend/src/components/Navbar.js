import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
        <img src="/images/logo_new.png" alt="CropNurture Logo" />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/analyze">Crop Analysis</Link></li>
        <li><Link href="/alerts">Outbreak Alerts</Link></li>
        <li><Link href="/community">Community</Link></li>
        <li><Link href="/pharmacists">Pharmacist Locator</Link></li>
        <li><Link href="/education">Education</Link></li>
      </ul>
    </nav>
  );
}
