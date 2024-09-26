import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to CropNurture</h1>
        <p>Your AI-powered assistant for crop disease detection and management.</p>
        <a href="/analyze" className={styles.heroBtn}>Get Started</a>
      </section>
      <section className={styles.features}>
        <h2>Our Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <h3>Instant Crop Diagnosis</h3>
            <img src="/images/diagnosis.png" alt="Instant Crop Diagnosis" className={styles.featureImage} />
            <p>Efficiently identify crop diseases with our cutting-edge AI-powered analysis tool. Simply upload an image of your crop, and our advanced algorithms will quickly analyze it to detect any signs of disease. Receive immediate insights and diagnostic results, enabling you to take swift action and minimize crop damage.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Personalized Treatment</h3>
            <img src="/images/treatment.png" alt="Personalized Treatment" className={styles.featureImage} />
            <p>Get customized treatment recommendations tailored to the specific condition of your crops. Based on the diagnostic results, our tool provides precise advice on the best practices, treatments, and interventions needed to address identified issues. This ensures that your crops receive the most effective care, enhancing their health and yield.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Community Support</h3>
            <img src="/images/community.png" alt="Community Support" className={styles.featureImage} />
            <p>Become a part of our vibrant community where you can engage with fellow farmers, exchange insights, and discuss best practices. Share your experiences, ask questions, and learn from others’ successes and challenges. Our platform fosters collaboration and knowledge sharing, helping you stay connected and informed in your farming journey.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Educational Resources</h3>
            <img src="/images/resources.png" alt="Educational Resources" className={styles.featureImage} />
            <p>Access a wide range of educational materials, including in-depth articles, video tutorials, and practical guides, to enhance your farming skills. Our resources cover essential topics such as disease prevention, nutrient management, and innovative farming techniques, helping you stay informed and optimize your agricultural practices.</p>
          </div>
        </div>
      </section>
      <section className={styles.newsletter}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest updates on crop management and AI tools.</p>
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
