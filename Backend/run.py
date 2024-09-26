import string
from flask import Flask, redirect, render_template, url_for, request,jsonify
from flask_cors import CORS
from markupsafe import Markup  # Updated import
import requests
import numpy as np
import pandas as pd
import pickle
import io
import torch
from torchvision import transforms
from PIL import Image
from utils.model import ResNet9
from utils.fertilizer import fertilizer_dic
from utils.disease import disease_dic

# -------------------------LOADING THE TRAINED MODELS -----------------------------------------------

# Commented out crop recommendation model
# crop_recommendation_model_path = 'models/RandomForest.pkl'
# crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))

# Loading plant disease classification model
disease_classes = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# Disease prediction model
disease_model_path = 'models/plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = 'thisissecretkey'

# -------------------------UTILITY FUNCTIONS -----------------------------------------------

def weather_fetch(city_name):
    """
    Fetch and return the temperature and humidity of a city.
    """
    api_key = 'YOUR_OPENWEATHERMAP_API_KEY'  # Replace with your actual API key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = f"{base_url}appid={api_key}&q={city_name}"
    response = requests.get(complete_url)
    x = response.json()

    if x.get("cod") != "404":
        y = x["main"]
        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

def predict_image(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label.
    """
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    # Get predictions from model
    yb = model(img_u)
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    return prediction

# -------------------------ROUTES -----------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        text = request.form['text']
        # Here you can handle the contact form data as needed
        # For simplicity, we'll just acknowledge the submission
        return render_template("contact.html", message="Thank you for contacting us!")
    return render_template("contact.html")

# Commented out the crop recommendation route
# @app.route('/crop-recommend', methods=['GET', 'POST'])
# def crop_recommend():
#     title = 'Crop Recommendation'
#     if request.method == 'POST':
#         try:
#             N = int(request.form['nitrogen'])
#             P = int(request.form['phosphorous'])
#             K = int(request.form['pottasium'])
#             ph = float(request.form['ph'])
#             rainfall = float(request.form['rainfall'])
#             city = request.form.get("city")

#             weather = weather_fetch(city)
#             if weather:
#                 temperature, humidity = weather
#                 data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
#                 my_prediction = crop_recommendation_model.predict(data)
#                 final_prediction = my_prediction[0]
#                 return render_template('crop-result.html', prediction=final_prediction, title=title)
#             else:
#                 return render_template('crop-result.html', prediction="Invalid City Name", title=title)
#         except Exception as e:
#             return render_template('crop-result.html', prediction="Error: " + str(e), title=title)
#     return render_template('crop.html', title=title)

@app.route('/fertilizer', methods=['GET', 'POST'])
def fertilizer_recommendation():
    title = 'Fertilizer Recommendation'
    if request.method == 'POST':
        try:
            crop_name = request.form['cropname']
            N = int(request.form['nitrogen'])
            P = int(request.form['phosphorous'])
            K = int(request.form['pottasium'])

            df = pd.read_csv('Data/fertilizer.csv')
            if crop_name not in df['Crop'].values:
                return render_template('fertilizer-result.html', recommendation="Crop not found.", title=title)

            nr = df[df['Crop'] == crop_name]['N'].iloc[0]
            pr = df[df['Crop'] == crop_name]['P'].iloc[0]
            kr = df[df['Crop'] == crop_name]['K'].iloc[0]

            n = nr - N
            p = pr - P
            k = kr - K
            temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
            max_value = temp[max(temp.keys())]
            if max_value == "N":
                key = 'NHigh' if n < 0 else "Nlow"
            elif max_value == "P":
                key = 'PHigh' if p < 0 else "Plow"
            else:
                key = 'KHigh' if k < 0 else "Klow"

            recommendation = fertilizer_dic.get(key, "No recommendation available.")
            response = Markup(str(recommendation))
            return render_template('fertilizer-result.html', recommendation=response, title=title)
        except Exception as e:
            return render_template('fertilizer-result.html', recommendation="Error: " + str(e), title=title)
    return render_template('fertilizer.html', title=title)

@app.route('/disease-predict', methods=['POST'])
def disease_prediction():
    if 'file' not in request.files:
        print("Request files: ", request.files)  # Debugging statement
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files.get('file')
    if not file:
        print("File is None")  # Debugging statement
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        img = file.read()
        prediction = predict_image(img)
        recommendation = disease_dic.get(prediction, "No information available.")
        return jsonify({'prediction': prediction, 'recommendation': recommendation}), 200
    except Exception as e:
        print("Error during processing: ", str(e))  # Debugging statement
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
