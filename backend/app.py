from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.housing_unit_type import Housing_unit_type
from models.property_list import Property_list

from validation_models import PropertyModel

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"])

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/housing_unit_types")
def housing_unit_types():
    housing_unit_types = Housing_unit_type.find_all()
    
    return housing_unit_types


@app.post("/property_list")
def save_property_list(data: PropertyModel):
    property_list = Property_list(data.name, data.location, data.rent, data.image, data.description, data.housing_unit_type_id)
    property_list.save()
    
    return property_list.to_dict()
