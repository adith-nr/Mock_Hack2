from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
from utils import mandi_price_rate, image_solution, find_govt_scheme

@app.route('/mandi_price', methods=['POST'])
def mandi_price_resolve():
    data = request.get_json()
    print("Received data:", data)
    return jsonify({"status": "success", "received": data})




# @app.route('/mandi_price', methods=['GET', 'POST'])
# def mandi_price_resolve():
#     if request.method == 'POST':
#         data = request.get_json()

#         state = data['state']
#         district = data['district']
#         crop_list = list(data['crop_list'])
#         return jsonify(mandi_price_rate(state, district, crop_list))
#     else:
#         return jsonify({"message": "ERROR"})

@app.route('/image_query', methods=['GET', 'POST'])
def image_query_resolve():
    return jsonify({"answer": "Hello test"})

@app.route('/govt_scheme', methods=['GET', 'POST'])
def govt_scheme_resolve():
    data = request.get_json()
    return jsonify({"you_sent": data})

if __name__ == '__main__':
    app.run(debug=True)
