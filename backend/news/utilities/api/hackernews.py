import requests
from decouple import config


BASE_URL=config("BASE_URL")

def get_live_data(type:str):
    query_url = f"{BASE_URL}{type}stories.json?print=pretty"
    try:
        payload = "{}"
        response = requests.get(query_url,data=payload)
        return response.json()
    except:
        return "Error"

def get_item_data(item_id:int):
    query_url = f"{BASE_URL}item/{item_id}.json?print=pretty"
    try:
        response = requests.get(query_url)
        return response.json()
    except:
        return "Error"

