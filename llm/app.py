from fastapi import FastAPI, Request, UploadFile, File,Form
import shutil, uuid, os
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

os.makedirs(SAVE_DIR, exist_ok=True)

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
async def image_query_resolve(
    file: UploadFile = File(...),
    prompt: str = Form(...)
):
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join("C:/Users/Azeem/Desktop/Mock_Hack2/llm/uploaded_images", filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    result = image_solution(path, prompt)

    os.remove(path)
    #print(result)

    return {"status": "success", "llm_responce": result}


@app.post("/govt_scheme")
async def govt_scheme_resolve(req: GovtSchemeRequest):
    print("Received scheme query:", req.prompt, req.state)
    result = find_govt_scheme(req.prompt, req.state)
    return {"status": "sucess", "llm_responce": result}
