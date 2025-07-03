from fastapi import FastAPI, Request, UploadFile, File,Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import tempfile
import os

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
    prompt: str 
    state: str

@app.post("/mandi_price")
async def mandi_price_resolve(req: MandiRequest):
    print("Received data:", req)
    result = mandi_price_rate(req.state, req.district, req.crop_list)
    return {"status": "success", "llm_response": result}

@app.post("/image_query")
async def image_query_resolve(request: Request):
    form = await request.form()
    print("Form keys received:", list(form.keys()))
    print("Form values:", {k: type(v) for k, v in form.items()})
    image_bytes = await form["image_bytes"].read()
    prompt = form["prompt"]
    print("Prompt:", prompt)
    print("Image bytes length:", len(image_bytes))
    result = image_solution(image_bytes, prompt)
    return {"status": "success", "llm_responce": result}


@app.post("/govt_scheme")
async def govt_scheme_resolve(req: GovtSchemeRequest):
    print("Received scheme query:", req.prompt, req.state)
    result = find_govt_scheme(req.prompt, req.state)
    return {"status": "sucess", "llm_responce": result}
