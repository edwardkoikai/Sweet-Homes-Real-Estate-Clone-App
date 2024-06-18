from db import conn, cursor
from models.housing_unit_type import  Housing_unit_type

class Property_list():
    TABLE_NAME = "property_list"
    
    def __init__(self, name, location, rent, image,  description, housing_unit_type_id):
        self.id = None
        self.name = name
        self.location = location
        self.rent = rent
        self.image = image
        self.description = description
        self.housing_unit_type_id = housing_unit_type_id
        self.created_at = None
        self.housing_unit_type = None
        
    def save(self):
        # Check if the record already exists
        cursor.execute(f"SELECT id FROM {self.TABLE_NAME} WHERE name = ?", (self.name,))
        row = cursor.fetchone()

        if row:
            self.id = row[0]
            print(f"{self.name} already exists with id {self.id}")
        else:
            sql = f"""
                INSERT INTO {self.TABLE_NAME} (name, location, rent, image, housing_unit_type_id, description)
                VALUES (?, ?, ?, ?, ?, ?)
            """
            cursor.execute(sql, (self.name, self.location, self.rent, self.image, self.housing_unit_type_id, self.description))
            conn.commit()
            self.id = cursor.lastrowid
            print(f"{self.name} saved with id {self.id}")
            
            return self
            
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "rent": self.rent,
            "image": self.image,
            "housing_unit_type": self.housing_unit_type,
            "description": self.description,
            "created_at": self.created_at
        }
        
    @classmethod
    def find_all(cls):
        sql = """
            SELECT property_list.*, housing_unit_type.* FROM property_list
            LEFT JOIN housing_unit_type ON property_list.housing_unit_type_id = housing_unit_type.id
            ORDER BY property_list.created_at ASC
        """
        
        rows = cursor.execute(sql).fetchall()
        print(rows)
        return [
            cls.row_to_instance(row).to_dict() for row in rows
        ]
    
    
    @classmethod
    def row_to_instance(cls,row):
        if row == None:
            return None
        
        property_list = cls(row[1], row[2], row[3], row[4], row[5], row[6])
        property_list.id = row[0]
        property_list.created_at = row[7]
        
        housing_unit_type = Housing_unit_type(row[9])
        housing_unit_type.id = row[8]
        
        property_list.housing_unit_type = housing_unit_type.to_dict()
        
        return property_list
    
    
    @classmethod
    def create_table(cls):
        sql = f""" 
            CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                location VARCHAR NOT NULL,
                rent INTEGER NOT NULL,
                image VARCHAR NOT NULL,
                description TEXT NOT NULL,
                housing_unit_type_id INTEGER NOT NULL REFERENCES housing_unit_type_id(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
            )
        """
        cursor.execute(sql)
        conn.commit()
        print("PropertyList table created successfully")
        
    # def delete_table(cls):
    #     sql = f""" 
    #         DROP TABLE {cls.TABLE_NAME}
    #     """
        
    #     cursor.execute(sql)
    #     conn.commit()
    #     print(f"{cls.TABLE_NAME} deleted successfully")
Property_list.create_table()
# Property_list.delete_table()
