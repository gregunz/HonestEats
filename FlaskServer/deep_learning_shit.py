import pickle
import pandas as pd
import numpy as np
import pycountry_convert as pyc

replacements = pickle.load(open("../resources/ing_replacements.obj", 'rb'))
ing_coocs = pickle.load(open("../resources/ing_coocs.obj", 'rb'))
ing_indices = pickle.load(open("../resources/ing_indices.obj", 'rb'))
vocab = pickle.load(open("../resources/vocab.obj", 'rb'))
alpha3_dist = pd.read_csv('../resources/dist_cepii.csv', index_col=['iso_o', 'iso_d'])[['dist']]
alpha3_all = set(alpha3_dist.reset_index()['iso_o'].values)
ing_to_country2 = pickle.load(open('../resources/ing_to_country2.p', 'rb'))

def lines_to_json(lines) :
    ings = to_model_ings(lines)
    json = dict()
    for i, ing in enumerate(ings) :
        loc_score = locality_score(ing)
        json[i] = {"locality_score":loc_score, "substitutes": [(c[0], locality_score(c[0])) for c in replacements[ing]]}
    return json

def ref(ing) :
    matches = []
    
    #build matches using full name ingredients
    for i in vocab :
        if i in ing :
            matches.append(i)
                        
    #sort matchings 
    matches = sorted(matches, key = lambda x : len(x.split(" ")), reverse=True)
    max_len = len(matches[0].split(" "))    
    matches = [m for m in matches if len(m.split(" ")) == max_len]
                  
    m_occs = [(m, ing_coocs[ing_indices[m], ing_indices[m]]) for m in matches]
    return sorted(m_occs, key=lambda x : x[1], reverse=True)[0][0]
    #return matches[0]

def to_model_ings(ings) :
    return [ref(i) for i in ings]

def locality_score(i, c='Switzerland'):
    max_dist = alpha3_dist['dist'].max()
    to_alpha3 = lambda c: pyc.country_name_to_country_alpha3(c)
    producers = [p for p in ing_to_country2[i] if to_alpha3(p) in alpha3_all]
    if c in producers:
        return 1, c
    else:
        distances = [alpha3_dist.loc[to_alpha3(c), to_alpha3(p)]['dist'] for p in producers]
        if len(distances) == 0:
            return -1, None
        dist_idx = np.argmin(distances)
        min_dist = distances[dist_idx]
    return  1 - np.power(min_dist / max_dist, 0.6), producers[dist_idx]
