"use client"
import { useState } from 'react';
import styles from '../../styles/CropAnalysis.module.css';

export default function CropAnalysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      resetResults();
    }
  };
  
  const resetResults = () => {
    setDiagnosis('');
    setRecommendation('');
    setError('');
  };

  const handleDiagnosis = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/disease-predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setDiagnosis(data.prediction);
        console.log('Received recommendation data:', data.recommendation); // Log the recommendation data
        setRecommendation(data.recommendation);  // This contains the HTML-like string
        setError('');
      } else {
        setError(data.error || 'An error occurred during the diagnosis.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  const renderRecommendation = (recommendation) => {
    const splitRecommendation = recommendation.split('<br/><br/>');
    const cropInfo = splitRecommendation[0];
    const causeOfDisease = splitRecommendation[1];
    let preventionMethods = splitRecommendation[2];
     
    preventionMethods = preventionMethods.replace(/<br\/>.*How to prevent\/ cure the disease.*<br\/>/i, '');
    // Extract the crop and disease from cropInfo
    const cropMatch = cropInfo.match(/<b>Crop<\/b>: ([^<]*)/);
    const diseaseMatch = cropInfo.match(/Disease: ([^<]*)/);
    const crop = cropMatch ? cropMatch[1] : 'Unknown Crop';
    const disease = diseaseMatch ? diseaseMatch[1] : 'Unknown Disease';

    return (
      <div className={styles.cropInfo}>
        <p><strong>Crop:</strong> {crop}</p>
        <p><strong>Disease:</strong> {disease}</p>
        <div className={styles.recommendationContainer}>
        <div className={styles.causeBox}>
          <h4 className={styles.subHeading}>Cause of Disease:</h4>
          <div dangerouslySetInnerHTML={{ __html: causeOfDisease }} className={styles.causeText}></div>
        </div>
        <div className={styles.preventionBox}>
          <h4 className={styles.subHeading}>How to Cure  Disease:</h4>
          <div dangerouslySetInnerHTML={{ __html: preventionMethods }} className={styles.preventionText}></div>
        </div>
      </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Crop Disease Analysis</h2>
      <p className={styles.instructions}>
        Upload an image of your crop to receive a diagnosis and treatment recommendations.
      </p>
      <div className={styles.uploadSection}>
        <input type="file" onChange={handleImageUpload} className={styles.fileInput} />
        {selectedImage && (
          <div className={styles.resultSection}>
            <div className={styles.imageContainer}>
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Crop" className={styles.imagePreview} />
            </div>
            {diagnosis && (
              <div className={styles.diagnosisBox}>
                <h3 className={styles.diseaseHeading}>Predicted Disease:</h3>
                <p className={styles.diagnosisText}>{diagnosis}</p>
                {recommendation && renderRecommendation(recommendation)}
              </div>
            )}
          </div>
        )}
        <button className={styles.analyzeButton} onClick={handleDiagnosis} disabled={!selectedImage}>
          Analyze Crop
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
