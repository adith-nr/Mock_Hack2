import requests 
from rapidfuzz import process
import os, io
from dotenv import load_dotenv
import json
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
import pandas as pd
import re
from PIL import Image
import google.generativeai as genai

from consts import all_states, crops
from schemes import *

load_dotenv()
MODEL = "llama-3.1-8b-instant"

llm = ChatGroq(
    temperature=0,
    model_name=MODEL,
    api_key=os.environ.get("GROQ_API_KEY"),
)

genai.configure(api_key= os.environ.get("GEMINI_API"))
model = genai.GenerativeModel('gemini-2.5-flash')

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

    #print(responce)

    data = pd.DataFrame(list(responce['records']))
    cols = ['state', 'district', 'market', 'commodity', 'min_price', 'max_price', 'modal_price']
    #['state', 'district', 'market', 'commodity', 'variety', 'grade', 'arrival_date', 'min_price', 'max_price', 'modal_price']

    crop_list = match_crops(crop_list, crops)
    final_df = data[data['commodity'].isin(crop_list)][cols]
    final_df = final_df.sort_values(["commodity", "modal_price"], ascending=[True, False])
    top5_by_crop = final_df.groupby("commodity").head(5)

    #print(top5_by_crop)

    prompt = f"""
    You are an expert agricultural assistant. The following is a DataFrame {top5_by_crop} containing mandi prices for various crops in different districts of a state. The user is located in the district: {district}.

    For each crop in {crop_list}, analyze the top 5 mandi price records and recommend the best district to sell the crop, considering both the maximum price and the shortest distance from the user's district. Use the provided DataFrame and, if needed, a `district_coords` dictionary for distance calculation.
    
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


def image_solution(img_bytes, query):
    img = Image.open(io.BytesIO(img_bytes))
    question = f"""
Which crop disease is this? Also give your response with respect to user's query: {query}.

Respond ONLY with a valid JSON object in the following format, and nothing else:

{{
  "crop": "<crop-name>",
  "disease": "<disease-name>",
  "solution": "<Advice on how to solve this problem for this crop disease. What actions could be taken. Mention which fungicides, pesticides or other resources that are needed.>"
}}
"""
    response = model.generate_content([
        question,
        img
    ])

    # Extract JSON object from response
    match = re.search(r'\{[\s\S]*\}', response.text)
    if match:
        json_str = match.group(0)
        try:
            result = json.loads(json_str)
            
            print(json.dump(result, indent=2))
            return result
        except Exception as e:
            print("Error parsing JSON:", e)
            print("Raw JSON string:", json_str)
    else:
        print("No JSON object found in response.")

# The parameter is expected to be the image filename ---> on the server

# img = Image.open("test2.jpg")
# buf = io.BytesIO()
# img.save(buf, format="JPEG")  # or "PNG" 
# img_bytes = buf.getvalue()


# image_solution(img_bytes, "My crop is affected with somthing , what to do?")


def find_govt_scheme(query, state):
    prompt = f"""

    Based on the user query :{query} and the need of the user go through all the National Schemes in {national_schemes},
    and all the state shcemes in {state_schemes[state]} and give responce.

    Find schemes that can resolve the users issue or help them in some way.

    Give a very high end detailed report covering everything from National or State Scheme, Eligibility, Documents Required if Any, How To Apply (Proper Procedure), Where To Apply (Provide Links if possible), Benefits, Waiting Period, Date's till whcih the scheme is active.

    Return this in a structured JSON Object of this format:

    {{
    <scheme-name> : <Report>
    }}
    
    """

    llm_responce = llm.invoke([HumanMessage(prompt)])


    # Extract JSON object from response
    match = re.search(r'\{[\s\S]*\}', llm_responce.content)
    if match:
        json_str = match.group(0)
        try:
            result = json.loads(json_str)
            print(json.dumps(result, indent=2))
            return result
        except Exception as e:
            print("Error parsing JSON:", e)
            print("Raw JSON string:", json_str)
    else:
        print("No JSON object found in response.")

#find_govt_scheme("I am facing issues with irrgation because I don't have any pond or lake. What to do?", "Uttar Pradesh")

