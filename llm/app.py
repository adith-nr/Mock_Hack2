from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from utils import mandi_price_rate 

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
    text: str  # Adjust if your payload is different


@app.post("/mandi_price")
async def mandi_price_resolve(req: MandiRequest):
    print("Received data:", req)
    result = mandi_price_rate(req.state, req.district, req.crop_list)
    return {"status": "success", "llm_response": result}


# @app.post("/image_query")
# async def image_query_resolve():
#     return {"answer": "Hello test"}


# @app.post("/govt_scheme")
# async def govt_scheme_resolve(req: GovtSchemeRequest):
#     print("Received scheme query:", req.text)
#     result = find_govt_scheme(req.text)
#     return {"you_sent": req.text, "summary": result}
