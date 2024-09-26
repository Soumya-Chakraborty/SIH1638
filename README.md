# SIH1638 - AI-Driven Crop Disease Prediction and Management System

## Overview

**Project Name:** AI-Driven Crop Disease Prediction and Management System  
**Track:** Agriculture, FoodTech & Rural Development  
**Submitted for:** Smart India Hackathon (SIH) 2024  
**Sponsored by:** Indian Council of Agricultural Research (ICAR)  
**Ministry:** Ministry of Agriculture and Farmers Welfare

---

## Problem Statement

Crop diseases can devastate yields, causing significant financial losses to farmers. Detecting these diseases early and intervening in time is essential for effective disease management. Current practices rely heavily on manual inspection, which is time-consuming, inefficient, and can miss early-stage diseases.

### Objective

To develop an **AI-driven system** that uses crop images and environmental data to predict potential disease outbreaks and provide actionable insights. This system will help farmers identify and treat diseases early, improving yield and reducing losses.

---

## Solution Description

The project focuses on building a **mobile and web-based application** that uses machine learning algorithms to identify crop diseases and offer treatment recommendations based on real-time data.

### Key Features:
- **AI Image Analysis:** Uses computer vision models to analyze crop images uploaded by farmers and detect signs of diseases.
- **Environmental Data Integration:** Considers environmental factors like temperature, humidity, and soil moisture to provide a more accurate disease prediction.
- **Real-Time Alerts:** Sends notifications to farmers about potential disease outbreaks in their fields.
- **Actionable Insights:** Provides detailed treatment plans and preventive measures tailored to specific crop diseases.
- **User-Friendly Interface:** Both mobile and web applications designed for ease of use by farmers with varying tech skills.

### Technologies Used:
- **Frontend:** React Native for mobile, ReactJS for web
- **Backend:** Node.js, Express
- **Machine Learning:** Python (TensorFlow/PyTorch) for training and deploying disease detection models
- **Database:** MongoDB for storing crop data, images, and environmental data
- **Cloud Services:** AWS for hosting the models and managing environmental data

---

## Expected Outcome

- **Increased Crop Yield:** By detecting diseases early, farmers can take preventive measures and increase productivity.
- **Cost Reduction:** Early detection and timely intervention reduce the cost of disease treatment.
- **Scalability:** The system is scalable for use across different regions and crops, making it widely applicable.

---

## Installation

### Prerequisites:
- **Node.js** and **npm** installed
- **Python 3.x** with necessary machine learning libraries

### Steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Soumya-Chakraborty/SIH2024.git
   cd SIH2024
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

4. **Set up the Python environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate   # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

5. **Run the application:**
   - Backend:
     ```bash
     cd server
     npm start
     ```

   - Frontend (Web):
     ```bash
     cd client
     npm start
     ```

---

## Usage

1. **Sign up/Login** to the application.
2. **Upload Crop Images** or input environmental data.
3. **Get real-time predictions** of possible diseases.
4. **Receive Treatment Recommendations** based on the detected disease.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For further information or queries, please reach out to us at:  
**Project Lead:** Soumya Chakraborty  
**Email:** [soumyachakraborty198181@gmail.com](mailto:soumyachakraborty198181@gmail.com)
