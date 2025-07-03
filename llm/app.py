from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from utils import mandi_price_rate, image_solution, find_govt_scheme # make sure these work with FastAPI

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input schema using Pydantic
class MandiRequest(BaseModel):
    state: str
    district: str
    crop_list: List[str]

class GovtSchemeRequest(BaseModel):
    query: str 
    state: str

class ImageRequest(BaseModel):
    img : UploadFile = File(...) #Edit here if img filename would be provided from the server
    query: str

@app.post("/mandi_price")
async def mandi_price_resolve(req: MandiRequest):
    print("Received data:", req)
    result = mandi_price_rate(req.state, req.district, req.crop_list)
    return {"status": "success", "llm_response": result}


@app.post("/image_query")
async def image_query_resolve(req: ImageRequest):
    print("Received data:", req)
    result = image_solution(req.img, req.query)
    return {"status": "sucess", "llm_responce": result}


@app.post("/govt_scheme")
async def govt_scheme_resolve(req: GovtSchemeRequest):
    print("Received scheme query:", req.query, req.state)
    result = find_govt_scheme(req.query, req.state)
    return {"status": "sucess", "llm_responce": result}
