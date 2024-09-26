from flask import Flask, request, jsonify

import googlemaps

app = Flask(__name__)


# Initialize Google Maps client
gmaps = googlemaps.Client(key='AIzaSyAIvOQ5TMxm9IdWuZeipj4OyASsOyiKLTo')

# Endpoint to fetch nearby pharmacies
@app.route('/nearby-pharmacies', methods=['POST'])
def get_nearby_pharmacies():
    location = request.json
    places = gmaps.places_nearby(location=(location['lat'], location['lng']), radius=1500, type='pharmacy')
    return jsonify(places['results'])

# Endpoint to fetch top pharmacists
@app.route('/top-pharmacists', methods=['GET'])
def get_top_pharmacists():
    pharmacists = [
        {"name": "Pharmacist A", "location": "Mumbai", "contact": "1234567890"},
        {"name": "Pharmacist B", "location": "Delhi", "contact": "9876543210"},
        {"name": "Pharmacist C", "location": "Chennai", "contact": "4567890123"},
        {"name": "Pharmacist D", "location": "Bangalore", "contact": "3216549870"},
        {"name": "Pharmacist E", "location": "Hyderabad", "contact": "6541239870"},
    ]
    return jsonify(pharmacists)

if __name__ == '__main__':
    app.run(debug=True)
