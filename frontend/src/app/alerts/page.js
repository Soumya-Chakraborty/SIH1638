"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../styles/Alerts.module.css'; // Import the consolidated CSS module

// Dynamically import MapComponent with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

const Alerts = () => {
  const [cropFilter, setCropFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const alerts = [
    { region: 'Punjab', crop: 'Wheat', disease: 'Blight', date: '2024-08-10',image:"https://t3.ftcdn.net/jpg/03/70/63/42/360_F_370634222_sM6fpUKjIOfva2hDPDUnp9NKPqxoC4Jv.jpg " },
    { region: 'Haryana', crop: 'Rice', disease: 'Blast', date: '2024-08-12',image:"https://www.agric.wa.gov.au/sites/gateway/files/leafblast.jpg " },
    { region: 'Karnataka', crop: 'Maize', disease: 'Mosaic Virus', date: '2024-08-15',image:"https://www.cabidigitallibrary.org/cms/10.1079/cabicompendium.8157/asset/6fb79db7-b862-4ede-9cfb-ad84f3143315/assets/graphic/mdmpv_6.jpg " },
    { region: "Punjab", crop: "Wheat", disease: "Yellow Rust", date: "2024-09-05" ,image:"https://projectblue.blob.core.windows.net/media/Default/Imported%20Publication%20Thumbs/AHDB%20Cereals%20&%20Oilseeds/Disease/Yellow%20rust%20symptoms%20in%20wheat.jpg "},
    { region: "Haryana", crop: "Rice", disease: "Bacterial Leaf Blight", date: "2024-09-08" ,image:"https://lh3.googleusercontent.com/proxy/SZhgq1RoXJsxwitObi7jH5vyaU5QzmlvOFSFZGcNmEAlroKdiAEMGCB62WJlNqu7iG3_K2D_D9UMTuNE-FsCNhtIhIPxu4-orU_kTIAau8CjCDQSrkuBw5wOahsRl3A"},
    { region: "Karnataka", crop: "Maize", disease: "Northern Corn Leaf Blight", date: "2024-09-12",image:"https://www.researchgate.net/publication/331733985/figure/fig5/AS:736334108979202@1552567140918/Northern-corn-leaf-blight-lesion-usually-large-cigar-shaped-and-tan-to-gray.jpg " },
    { region: "Andhra Pradesh", crop: "Chilli", disease: "Anthracnose", date: "2024-09-15",image:"https://apps.lucidcentral.org/pppw_v10/images/entities/capsicum_chilli_anthracnose_177/20090630092.jpg " },
    { region: "Maharashtra", crop: "Cotton", disease: "Boll Rot", date: "2024-09-18" ,image:"https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2Fboll-rot-faske.jpg%2F070735b16afaf45d5115f1535746a417.jpg&h=0&w=316&fit=contain "},
    { region: "West Bengal", crop: "Jute", disease: "Stem Rot", date: "2024-09-22" ,image:"https://plantlet.org/wp-content/uploads/2019/05/anthracnose-1.jpg "},
    { region: "Madhya Pradesh", crop: "Soybean", disease: "Soybean Rust", date: "2024-09-10",image:"https://extension.umn.edu/sites/extension.umn.edu/files/rust1_600px.jpg " },
    { region: "Tamil Nadu", crop: "Groundnut", disease: "Tikka Disease", date: "2024-09-14" ,image:"https://cdn.jiokrishi.com/KMSOPEN/website/images/resource-blog-image-groundnut3.webp "},
    { region: "Uttar Pradesh", crop: "Sugarcane", disease: "Red Rot", date: "2024-09-17",image:"https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs12355-023-01292-x/MediaObjects/12355_2023_1292_Fig1_HTML.jpg " },
    { region: "Gujarat", crop: "Cotton", disease: "Leaf Curl Virus", date: "2024-09-20",image:"https://content.peat-cloud.com/w400/cotton-leaf-curl-virus-cotton-1666622759.jpg " },
    { region: "Odisha", crop: "Paddy", disease: "Sheath Blight", date: "2024-09-23",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kT4jQqA3y3nLWsdHfKpim6jqA4foehrO6A&s " },
    { region: "Bihar", crop: "Maize", disease: "Downy Mildew", date: "2024-09-26",image:"https://izumibiosciences.in/wp-content/uploads/2023/09/Downy-Mildew-of-Maize-Symptoms-Life-Cycle-Management.jpg " },
    { region: "Karnataka", crop: "Coffee", disease: "Cercospora leaf spot", date: "2024-09-07",image:"https://apps.lucidcentral.org/pppw_v12/images/entities/coffee_browneye_spot_142/coffeespot2_copy.jpg " }
  ];

  const uniqueCrops = [...new Set(alerts.map(alert => alert.crop))];
  const uniqueRegions = [...new Set(alerts.map(alert => alert.region))];

  const filteredAlerts = alerts.filter(alert => {
    return (cropFilter === '' || alert.crop === cropFilter) &&
           (regionFilter === '' || alert.region === regionFilter);
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Outbreak Alerts</h2>

      <div className={styles.filterContainer}>
        <select 
          value={cropFilter} 
          onChange={e => setCropFilter(e.target.value)} 
          className={styles.filter}
        >
          <option value="" >All Crops</option>
          {uniqueCrops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>

        <select 
          value={regionFilter} 
          onChange={e => setRegionFilter(e.target.value)} 
          className={styles.filter}
        >
          <option value="">All Regions</option>
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className={styles.alertGrid}>
        {filteredAlerts.map((alert, index) => (
          <div key={index} className={styles.alertCard}>
            <div className={styles.alertContent}>
              <img src={alert.image} alt={alert.disease} className={styles.alertImage} />
              <div className={styles.alertInfo}>
                <h3>{alert.crop} - {alert.disease}</h3>
                <p><strong>Region:</strong> {alert.region}</p>
                <p><strong>Date:</strong> {alert.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MapComponent alerts={filteredAlerts} />
    </div>
  );
};

export default Alerts;
