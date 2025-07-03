import requests 
from rapidfuzz import process
import os
from dotenv import load_dotenv
import json
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
import pandas as pd

from consts import all_states, crops

load_dotenv()
MODEL = "llama-3.1-8b-instant"

llm = ChatGroq(
    temperature=0,
    model_name=MODEL,
    api_key=os.environ.get("GROQ_API_KEY"),
)

def match_crops(user_crop_list, master_crop_list, score_cutoff=70):
    matched_list = set()

    for crop in user_crop_list:
        match, score, _ = process.extractOne(crop, master_crop_list, score_cutoff=score_cutoff)
        if match:
            matched_list.add(match)

    return list(matched_list)


def mandi_price_rate(state, district, crop_list):
    API = os.environ.get("GOV_API")
    STATE = state
    LIMIT = 200

    url = (
        f"https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key={API}&format=json&limit={LIMIT}&filters[state.keyword]={STATE}"
    )

    responce = requests.get(url)
    responce = json.loads(responce.text)

    data = pd.DataFrame(list(responce['records']))
    cols = ['state', 'district', 'market', 'commodity', 'min_price', 'max_price', 'modal_price']
    #['state', 'district', 'market', 'commodity', 'variety', 'grade', 'arrival_date', 'min_price', 'max_price', 'modal_price']

    crop_list = match_crops(crop_list, crops)
    final_df = data[data['commodity'].isin(crop_list)][cols]
    final_df = final_df.sort_values(["commodity", "modal_price"], ascending=[True, False])
    top5_by_crop = final_df.groupby("commodity").head(5)

    prompt = f"""
    You are an expert agricultural assistant. The following is a DataFrame {top5_by_crop} containing mandi prices for various crops in different districts of a state. The user is located in the district: {district}.

    For each crop, analyze the top 5 mandi price records and recommend the best district to sell the crop, considering both the maximum price and the shortest distance from the user's district. Use the provided DataFrame and, if needed, a `district_coords` dictionary for distance calculation.
    
    Only output the recommendations for each crop to the user for what he needs to do, where to sell and at what best price . Do not include any code, explanation, or extra text.
    """
    llm_responce = llm.invoke([HumanMessage(prompt)])


    crop_json = {}
    for _, row in top5_by_crop.iterrows():
        crop = row['commodity']
        entry = [row['market'], row['district'], row['max_price'], row['modal_price']]
        if crop not in crop_json:
            crop_json[crop] = []
        crop_json[crop].append(entry)

    crop_json['llm_resoponce'] = llm_responce.content
    print(json.dumps(crop_json, indent=2))

    return crop_json


#Testing 
# mandi_price_rate("Haryana", "gurgaon", ["Apple",'Arhar',
#  'Banana',
#  'Beetroot',
#  'Tomato',
#  'Bhindi',
#  'Ladies Finger'])


def image_solution():
    return None


def find_govt_scheme():
    return None