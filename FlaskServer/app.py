from flask import Flask, request, jsonify
from flask_cors import CORS

from deep_learning_shit import lines_to_json


app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def post_recipe():
    ings = request.get_json()
    trimmed_ings = [ing.strip() for ing in ings]
    return jsonify(lines_to_json(trimmed_ings))
