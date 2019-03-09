from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['POST'])
def locality_score():
    ings = request.get_json()
    trimmed_ings = []
    for ing in ings:
        trimmed_ings.append(ing.strip())


#    ing_string = '200 ml organic chicken stock;' \
#                 '2 handfuls of red and green grapes;' \
#                 'a few sprigs of fresh flat-leaf parsley'
    print(trimmed_ings)
    #ings = json.parse(ing_string)
    return deep_learning_shit(trimmed_ings)


def deep_learning_shit(ings_list):
    recipe_dict = {}
    for ing in ings_list:
        recipe_dict[ing] = {'locality_score': 1, 'substitutes': 'potato, sweet_potato, blablabla'}
    return jsonify(recipe_dict)
