from pydantic import BaseModel



class PropertyModel(BaseModel):
    name: str 
    location: str
    rent: int
    image: str
    housing_unit_type_id: int
    description: str
    
    