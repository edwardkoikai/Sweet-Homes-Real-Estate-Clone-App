from fastapi import FastAPI
from pydantic import BaseModel
from models.property_list import Housing_unit_type

app = FastAPI()

class PropertyModel(BaseModel):
    name: str 
    description: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/property_list")
def get_property_list():
    return [{"name": "Runda"}]

@app.post("/property_list")
def save_property_list(data: PropertyModel):
    print(data)