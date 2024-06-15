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


@app.get("/housing_unit_types")
def housing_unit_types():
    housing_unit_types = Housing_unit_type.find_all()
    
    return housing_unit_types

@app.get("/property_list")
def get_property_list():
    return [{"name": "Runda"}]

@app.post("/property_list")
def save_property_list(data: PropertyModel):
    print(data)