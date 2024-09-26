'use client'; 
import React, { useState } from 'react';
import styles from '../../styles/Education.module.css';

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(null);

  const resources = [
    { 
      title: 'Understanding Crop Diseases', 
      link: 'https://geopard.tech/blog/how-to-control-crop-diseases-with-smart-agriculture/#:~:text=Crop%20diseases%20symptoms%20caused%20by,and%20the%20entire%20plant%3B%20and', 
      description: 'A comprehensive guide to common crop diseases and their management. Includes references for wheat, maize, and soybean diseases.'
    },
    { 
      title: 'Organic Treatments for Crop Diseases', 
      link: 'https://cropprotectionnetwork.org/', 
      description: 'Explore organic and natural treatment methods for various crop diseases. Detailed information on managing diseases in vegetables, fruits, and grains.'
    },
    { 
      title: 'Using AI in Agriculture', 
      link: 'https://intellias.com/artificial-intelligence-in-agriculture/', 
      description: 'Learn how AI is revolutionizing the agriculture industry. Focuses on AI applications in monitoring and managing diseases in various crops, including rice and potatoes.'
    },
    {
      title: 'Disease Management for Wheat Crops',
      link: 'https://www.myfields.info/book/9-disease-management-wheat',
      description: 'An in-depth guide to common diseases in wheat crops and effective management strategies. Includes information on Fusarium head blight and wheat rust.'
    },
    {
      title: 'Soybean Disease Management',
      link: 'https://cals.cornell.edu/field-crops/soybeans/diseases-soybeans',
      description: 'Resource on soybean diseases like soybean rust and white mold, including integrated management practices and resistance strategies.'
    },
    {
      title: 'Maize Crop Health',
      link: 'https://www.dairynz.co.nz/feed/crops/maize/',
      description: 'Focuses on diseases affecting maize, such as maize leaf blight and northern corn leaf blight, with strategies for prevention and control.'
    }
  ];

  const videos = [
    { title: 'Crop Diseases and their control', thumbnail: 'https://img.youtube.com/vi/OtiqxEaNY2o/hqdefault.jpg', link: 'https://www.youtube.com/watch?v=OtiqxEaNY2o' },
    { title: 'Organic Farming Techniques', thumbnail: 'https://img.youtube.com/vi/oQ1KltEBydE/hqdefault.jpg', link: 'https://www.youtube.com/watch?v=oQ1KltEBydE' },
    { title: 'Identify Plants disease with help of leaves color', thumbnail: 'https://img.youtube.com/vi/zj9NHDhYWbU/hqdefault.jpg', link: 'https://www.youtube.com/watch?v=zj9NHDhYWbU' },
    { title: 'Artificial Intelligence (AI) in Agriculture', thumbnail: 'https://img.youtube.com/vi/_tijHjup-gM/hqdefault.jpg', link: 'https://www.youtube.com/watch?v=_tijHjup-gM' },
  ];

  const faqs = [
    { question: 'What are the most common causes of crop diseases?', answer: 'Crop diseases are typically caused by pathogens such as fungi, bacteria, viruses, and nematodes. Environmental factors like poor soil conditions, excessive moisture, and temperature fluctuations can also contribute to the spread of diseases.' },
    { question: 'How can I identify if my crops are diseased?', answer: 'Common signs of crop diseases include discoloration, wilting, spots on leaves, stunted growth, and abnormal development. Early identification is crucial for effective management.' },
    { question: 'What are some natural methods for managing crop diseases?', answer: 'Natural methods include crop rotation, using disease-resistant crop varieties, applying organic fungicides, and encouraging beneficial insects that can help control disease-spreading pests.' },
    { question: 'Can crop diseases spread from one plant to another?', answer: 'Yes, many crop diseases can spread through water, wind, soil, insects, or contaminated tools. It\'s important to implement good hygiene practices and proper crop spacing to minimize the risk of spreading diseases.' },
    { question: 'How can I prevent crop diseases from affecting my harvest?', answer: 'Preventative measures include selecting resistant crop varieties, ensuring proper soil health, rotating crops, practicing good irrigation management, and maintaining proper plant spacing to reduce humidity around plants.' },
    { question: 'Are there any technologies that can help in detecting and managing crop diseases?', answer: 'Yes, modern technologies such as drones, AI-based disease detection tools, and mobile apps can help farmers monitor crop health, detect early signs of diseases, and manage them more efficiently.' }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Crop Diseases with Educational Resources</h2>

      <div className={styles.resourceGrid}>
        {resources.map((resource, index) => (
          <div key={index} className={styles.resourceCard}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.learnMoreLink}
            >
              Learn More
            </a>
          </div>
        ))}
      </div>

      {/* New Video Section */}
      <div className={styles.videoSection}>
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <div key={index} className={styles.videoCard}>
              <a 
                href={video.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.videoLink}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className={styles.videoThumbnail}
                />
                <h3 className={styles.videoTitle}>{video.title}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.faqSection}>
        <h3 className={styles.faqHeading}>Frequently Asked Questions (FAQs)</h3>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div 
              className={styles.faqQuestion} 
              onClick={() => toggleFAQ(index)}
            >
              <span className={styles.faqIndicator}>
                {activeIndex === index ? '–' : '+'}
              </span>
              {faq.question}
            </div>
            <div 
              className={`${styles.faqAnswer} ${activeIndex === index ? styles.open : ''}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <br/><br/><br/>
    </div>
  );
}
